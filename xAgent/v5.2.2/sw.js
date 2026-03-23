const CACHE_VERSION = 'cache-v' + (new Date().getTime());
const ASSETS_TO_CACHE = [
	'./',
	'./favicon.svg',
	// './index.html',
	'./index.js',
	'./xAgent.LICENSE.txt',
	// './offline.html',
];


self.addEventListener('install', (event) => {
	// Force the waiting service worker to become the active service worker.
	self.skipWaiting();

	event.waitUntil(
		caches.open(CACHE_VERSION).then((cache) => {
			// Map each URL to a cache.add() promise
			const cachePromises = ASSETS_TO_CACHE.map(url =>
				cache.add(url).catch((ex) => console.warn(`[SW] Failed to cache: ${url}`, ex))
			);

			// Wait for all individual attempts to complete
			return Promise.all(cachePromises);
		})
	);
});



self.addEventListener('fetch', (event) => {
	let requestKey = event.request;
	const url = new URL(requestKey.url);

	// Normalization: Map /index.html requests to the root '/' cache key
	switch (url.pathname) {
		case './index.html': requestKey = './'; break;
	}

	event.respondWith(
		caches.match(requestKey).then((cachedResponse) => {
			// 1. Setup the background fetch (Revalidate)
			// We use { cache: 'no-cache' } to force the browser to check the server 
			// even if the browser's internal HTTP cache thinks the file is fresh.
			// Only update the cache if we get a successful response
			const fetchPromise = fetch(event.request, { cache: 'no-cache' }).then((networkResponse) => {
				if (networkResponse && networkResponse.status === 200) {
					const cacheCopy = networkResponse.clone();
					caches.open(CACHE_VERSION).then((cache) => {
						cache.put(requestKey, cacheCopy);
					}).catch(ex => console.error(`Cache open failed: ${ex}`));
				}
				return networkResponse;
			}).catch((ex) => {
				// Network is down, quiet failure as we likely have a cache
				console.error(`[SW] Update failed: ${ex}`);
			});

			// 2. Return the cached response immediately (Stale)
			// or fall back to the network request if cache is empty
			return cachedResponse || fetchPromise;
		}).catch(() => {
			// 3. Absolute fallback for navigation if both fail
			if (event.request.mode === 'navigate') {
				return caches.match('./offline.html');
			}
		})
	);
}); // fetch



self.addEventListener('activate', (event) => {
	const cacheAllowlist = [CACHE_VERSION];

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					// If the cache name isn't in our allowlist, delete it
					if (!cacheAllowlist.includes(cacheName)) {
						console.log(`Deleting old cache: ${cacheName}`);
						return caches.delete(cacheName);
					}
				})
			);
		}).then(() => {
			// Claims any client tabs immediately so the new SW takes control
			// without needing a manual page reload.
			return self.clients.claim();
		})
	);
});


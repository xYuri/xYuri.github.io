---
layout: default
permalink: /Axis/releases/
breadcrumbs: "Axis/releases/"
title: "Axis Releases"
---

## Axis Releases:

{% assign releases = site.axis | where_exp: "item", "item.path contains 'releases/'" | sort: "path" | reverse %}
{% for file in releases %}
	{% assign filename = file.path | split: "/" | last %}
	{% assign version_tag = filename | remove: ".md" %}
- v{{ version_tag }}  [[Release Notes]({{ file.url | relative_url }})\|[Download](https://github.com/xYuri/Axis-App/releases/tag/{{ version_tag }})]
{% endfor %}



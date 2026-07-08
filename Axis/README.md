---
layout: default
permalink: /Axis/
title: "Axis"
---

# Axis
*Your **all-in-one** life companion.*

Manage your daily tasks, track your health, and monitor your finances — all from a single, beautifully designed app.

**Axis** brings together **Todos** & **Tasks**, **Health** tracking, **Financial** tracking, and **Personalization** tools, making it effortless to keep **Track** of everything, stay **Organized**, and in **Control**.

*<ins>**Axis**</ins> – Everything you need, all in one place.*

<br/>

-----

<br/>

## Platforms:

**Axis** is a multi-platform app, and is availble on all platforms;

- Web: (Desktop & Mobile)
- Mobile: Android, iOS (Web)
- Desktop: (Windows & Linux & MAC)

<br/>

-----

<br/>

## Features:
- 📃 Todo List
- ⚖ Weight Monitor
  - 📈 Weekly Weight Chart
- 🎨 Custom Themes

-----

## Upcoming Features:
- 📅 Planner & Tasks Scheduler
  - Day Planner
  - Week Planner
  - Month Planner
- 🏃🏻‍♂️‍➡️ Activity Tracker
- 💲 Financial Monitor
  - Spendings Tracker
  - Income Tracker
  - Bills/Debt Tracker
  - Financial Insights
- 🔥 Calories Monitor
  - Calories Intake
  - Calories Burnt
  - Target Calories
  - Calories Consumption Insights
- ⚖ Weight Monitor
  - 📈 Monthly Weight Chart
- 💧 Period Tracker
- ☁️ Online backup

<br/>

-----

<br/>

### Latest Stable Release (v0.1.0): [[Download](https://github.com/xYuri/Axis-App/releases/latest) | [Release Notes](https://github.com/xYuri/Axis-App/blob/main/releaseNotes/v0.1.0.md)]

<br/>

-----

<br/>

## Axis Releases

{% assign notes = site.axis | where_exp: "item", "item.path contains 'releaseNotes/'" | sort: "path" | reverse %}

{% for file in notes %}
	{% assign filename = file.path | split: "/" | last %}
	{% assign version_tag = filename | remove: ".md" %}
- v{{ version_tag }} - [[Release Notes]({{ file.url | relative_url }})\|[Download](https://github.com/xYuri/Axis-App/releases/tag/{{ version_tag }})]
{% endfor %}



# Finance Blog — Documentation

**Site:** finance.abdulmalik.de
**Generator:** Jekyll 4.3 (Ruby static site generator)
**Hosting:** GitHub Pages
**Last updated:** March 2026

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [How Jekyll Works](#2-how-jekyll-works)
3. [Configuration](#3-configuration)
4. [Layouts](#4-layouts)
5. [Includes (Partials)](#5-includes-partials)
6. [Styling (CSS)](#6-styling-css)
7. [JavaScript Behaviour](#7-javascript-behaviour)
8. [Writing Posts](#8-writing-posts)
9. [Front Matter Reference](#9-front-matter-reference)
10. [Categories](#10-categories)
11. [Adding Images & Media](#11-adding-images--media)
12. [Running Locally](#12-running-locally)
13. [Deployment (GitHub Pages)](#13-deployment-github-pages)
14. [Dependencies (Gemfile)](#14-dependencies-gemfile)

---

## 1. Project Structure

```
FinanceBlog/
│
├── _config.yml              # Global site settings
├── Gemfile                  # Ruby gem dependencies
├── CNAME                    # Custom domain (finance.abdulmalik.de)
├── index.html               # Homepage (uses home layout)
├── documentation.md         # This file
│
├── _layouts/                # HTML wrapper templates
│   ├── default.html         # Base template: <html>, <head>, header, footer
│   ├── home.html            # Post grid + category filter (homepage)
│   └── post.html            # Individual post page
│
├── _includes/               # Reusable HTML fragments
│   ├── header.html          # Sticky nav bar
│   └── footer.html          # Footer with links
│
├── _posts/                  # All blog post content (Markdown files)
│   └── YYYY-MM-DD-slug.md   # Post files — date prefix is mandatory
│
├── categories/              # Category landing pages
│   ├── projects.html        # /categories/projects/
│   ├── articles.html        # /categories/articles/
│   └── job-prep.html        # /categories/job-prep/
│
├── assets/
│   ├── css/
│   │   └── main.css         # All site styling
│   ├── js/
│   │   └── main.js          # Theme toggle, spotlight, category filter
│   └── images/              # Post images and media (create this folder)
│
└── _site/                   # Auto-generated build output — DO NOT EDIT
```

> **Rule:** Never edit files inside `_site/`. That folder is Jekyll's compiled output and gets overwritten on every build.

---

## 2. How Jekyll Works

Jekyll is a **static site generator**. It takes your templates and Markdown files and compiles them into a folder of plain HTML files (`_site/`) that can be hosted anywhere.

### The build pipeline

```
_posts/*.md   ─┐
_layouts/     ─┤──► Jekyll build ──► _site/  ──► Served to browser
_includes/    ─┤
_config.yml   ─┘
```

### Key concepts

| Concept | What it is |
|---|---|
| **Front matter** | YAML block at the top of every file, between `---` lines. Tells Jekyll which layout to use, the title, date, tags, etc. |
| **Liquid** | Templating language inside `.html` files. `{{ variable }}` outputs a value. `{% tag %}` runs logic (loops, conditionals). |
| **Layout** | An HTML wrapper that other pages slot into via `{{ content }}`. |
| **Include** | A reusable HTML fragment inserted with `{% include filename.html %}`. |
| **Paginator** | Jekyll plugin that splits the post list across multiple pages (8 posts per page, set in `_config.yml`). |

---

## 3. Configuration

**File:** `_config.yml`

```yaml
title: "Abdul Malik | Finance & Technology"
description: "Writings on quantitative finance, capital markets, machine learning, and financial technology."
url: "https://finance.abdulmalik.de"
baseurl: ""

author:
  name: "Abdul Malik"
  email: "abdul.malik.work@gmail.com"
  linkedin: "https://www.linkedin.com/in/abdulmalik2737/"
  github: "https://github.com/leo-lightfoot"
  portfolio: "https://abdulmalik.de"

markdown: kramdown          # Markdown parser
highlighter: rouge          # Syntax highlighting for code blocks
permalink: /:year/:month/:day/:title/   # URL format for posts

paginate: 8                 # Posts per page on homepage
paginate_path: "/page:num/" # URL for page 2, 3, etc.

plugins:
  - jekyll-paginate         # Multi-page post list
  - jekyll-seo-tag          # Auto <meta> SEO tags
  - jekyll-sitemap          # Auto-generates sitemap.xml
```

**To change site-wide values** (author name, links, description), edit only `_config.yml` — it propagates everywhere via `{{ site.author.name }}`, `{{ site.description }}`, etc.

---

## 4. Layouts

Layouts live in `_layouts/` and define the HTML shell for a page type. Each layout declares which parent layout it extends (if any) via its own front matter.

### `default.html` — Base template

Every page on the site uses this as its outer shell. It provides:

- `<html>`, `<head>`, `<body>` structure
- Google Fonts (Inter) and main.css link
- Open Graph meta tags (for social sharing previews)
- Jekyll SEO tag plugin (`{% seo %}`)
- Spotlight div (the blue cursor glow effect)
- Theme toggle buttons (Dark / Light)
- `{% include header.html %}` — the nav bar
- `<main>{{ content }}</main>` — where child layouts/pages inject their HTML
- `{% include footer.html %}`
- main.js script tag

### `home.html` — Homepage post grid

Extends `default.html`. Renders:

1. **Hero section** — site title, description, link to portfolio
2. **Category filter buttons** — All / Projects / Articles / Job Prep (client-side JS filtering)
3. **Post grid** — loops over `paginator.posts` and renders a card per post
4. **Pagination** — Previous / Next links when posts exceed 8

Each post card shows: category badge → date → read time → title → excerpt → tags (max 4).

The `data-category` attribute on each card (e.g. `data-category="projects"`) is what the JS filter reads to show/hide cards.

### `post.html` — Individual post page

Extends `default.html`. Renders:

1. **Back link** — returns to homepage
2. **Post header** — category badge, date, estimated read time, title, subtitle (if set), tags
3. **Hero image** — full-width banner (only if `image:` is set in front matter)
4. **Post body** — the compiled Markdown content with all typography styles
5. **Author card** — name, role, LinkedIn / GitHub / Portfolio links
6. **Related posts** — up to 2 posts from the same category (excludes current post)

Read time is calculated automatically: `word count ÷ 200 + 1` minutes.

---

## 5. Includes (Partials)

### `_includes/header.html`

Sticky navigation bar at the top of every page. Contains:

- **Logo** — "Abdul Malik / Finance & Technology", links to homepage
- **Nav links:** All (`/`) · Projects (`/categories/projects/`) · Articles (`/categories/articles/`) · Job Prep (`/categories/job-prep/`) · Portfolio ↗ (external, opens in new tab)
- Active state: nav links get the `.active` class when `page.url` matches their path

### `_includes/footer.html`

Site footer containing:

- Copyright notice with portfolio link
- GitHub and LinkedIn icon links (pulled from `site.author.*` in `_config.yml`)

---

## 6. Styling (CSS)

**File:** `assets/css/main.css`

The entire site uses a single CSS file with no external frameworks. The design system mirrors the portfolio at abdulmalik.de.

### Design tokens (CSS variables)

Defined on `:root` (dark theme default) and overridden by `[data-theme="light"]`:

| Variable | Dark | Light | Used for |
|---|---|---|---|
| `--bg-primary` | `#0a1929` | `#ffffff` | Page background |
| `--bg-secondary` | `#132f4c` | `#f5f7fa` | Code blocks, table headers |
| `--bg-card` | `#1e3a5f` | `#ffffff` | Post cards, author box |
| `--text-primary` | `#e3f2fd` | `#0d1b2a` | Body text, headings |
| `--text-secondary` | `#ccd6e0` | `#2d4a6a` | Metadata, excerpts, nav inactive |
| `--accent` | `#1976d2` | `#1976d2` | Buttons, borders, active states |
| `--accent-light` | `#42a5f5` | `#1565c0` | Links, h4 headings, tags |
| `--border` | `rgba(25,118,210,0.2)` | `rgba(25,118,210,0.15)` | Card borders, dividers |
| `--tag-bg` | `rgba(25,118,210,0.15)` | `rgba(25,118,210,0.08)` | Tag pill background |
| `--tag-text` | `#90caf9` | `#1565c0` | Tag pill text |

### Category badge colours

| Category | Badge background | Badge text |
|---|---|---|
| Projects | `rgba(25,118,210,0.15)` (blue) | `#90caf9` |
| Articles | `rgba(123,31,162,0.15)` (purple) | `#ce93d8` |
| Job Prep | `rgba(230,81,0,0.15)` (orange) | `#ffab91` |

CSS classes: `.post-category--projects`, `.post-category--articles`, `.post-category--job-prep`

### Post body typography

The `.post-body` class styles all compiled Markdown content:

| Element | Style |
|---|---|
| `h2` | 1.6rem, bold, bottom border line |
| `h3` | 1.25rem, semi-bold |
| `h4` | 1.05rem, accent-light colour |
| `p` | 1rem, 1.8 line height, 1.25rem bottom margin |
| `blockquote` | Left blue border, accent-bg background, italic |
| `code` (inline) | Monospace, accent-light colour, bg-secondary background |
| `pre > code` | Full code block, bg-secondary, scrollable |
| `table` | Full-width, header in bg-secondary, alternating hover |
| `ul` / `ol` | 1.5rem left indent |

### Syntax highlighting

Uses Rouge (server-side, no JS needed). Token colours defined at the bottom of main.css under `.highlight`. Code blocks are automatically highlighted when you use fenced code with a language identifier:

````markdown
```python
# This gets syntax highlighted
```
````

---

## 7. JavaScript Behaviour

**File:** `assets/js/main.js`

Three independent features, no external libraries:

### Theme toggle

- Reads saved preference from `localStorage` on page load; falls back to OS preference (`prefers-color-scheme`)
- Clicking Dark/Light sets `data-theme` attribute on `<html>` and saves to `localStorage`
- CSS variables switch instantly via the `[data-theme="light"]` override block

### Spotlight effect

- Tracks mouse position via `mousemove` event
- Updates `--x` and `--y` CSS custom properties on `.spotlight` div
- The div uses a `radial-gradient` centred at those coordinates to create the blue glow
- Fades out after 100ms of no mouse movement

### Category filter

- Reads `data-filter` attribute from each `.filter-btn`
- Compares against `data-category` attribute on each `.post-card`
- Shows/hides cards with `display: none` — no page reload needed
- Only works on the homepage (where `data-category` cards exist); category pages use server-side Jekyll filtering

### Fade-in on scroll

- Uses `IntersectionObserver` to detect when post cards enter the viewport
- Cards start at `opacity: 0, translateY(16px)` and transition to visible when 10% visible
- Degrades gracefully in old browsers (feature-detected before use)

---

## 8. Writing Posts

### Step 1: Create the file

All posts live in `_posts/`. The filename format is **mandatory**:

```
_posts/YYYY-MM-DD-your-post-slug.md
```

Examples:
```
_posts/2026-03-11-yield-curve-pca.md
_posts/2026-04-01-black-scholes-explained.md
_posts/2026-05-15-ib-interview-prep.md
```

The date in the filename sets the post date. The slug (the part after the date) becomes part of the URL.

### Step 2: Write the front matter

Every post starts with a YAML block between `---` lines:

```yaml
---
layout: post
title: "Your Post Title"
subtitle: "Optional one-line description shown under the title"
category: Projects          # Must be exactly: Projects, Articles, or Job Prep
date: 2026-04-01
tags: [Python, Finance, Risk]
image: /assets/images/your-image.jpg   # Optional hero image
github: "https://github.com/..."       # Optional — not yet rendered in template
---
```

### Step 3: Write content in Markdown

After the closing `---`, write your post using standard Markdown:

```markdown
## Section heading

Normal paragraph text. **Bold text.** *Italic text.*

### Sub-heading

- Bullet point
- Another point

1. Numbered list
2. Second item

> This is a blockquote — rendered with a blue left border.

Inline `code` looks like this.
```

Code block with syntax highlighting:

    ```python
    import numpy as np
    result = np.mean([1, 2, 3])
    ```

| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |

[Link text](https://example.com)
```

### Generated URL

A post at `_posts/2026-04-01-black-scholes.md` becomes:

```
https://finance.abdulmalik.de/2026/04/01/black-scholes/
```

---

## 9. Front Matter Reference

Complete list of supported front matter fields:

| Field | Required | Type | Description |
|---|---|---|---|
| `layout` | Yes | string | Always `post` for blog posts |
| `title` | Yes | string | Post title — shown in card and post header |
| `category` | Yes | string | `Projects`, `Articles`, or `Job Prep` — controls badge colour and category filter |
| `date` | Yes | date | `YYYY-MM-DD` format — overrides filename date if both present |
| `subtitle` | No | string | Short description shown under title on post page |
| `tags` | No | list | List of tag strings shown as pills — e.g. `[Python, PCA, Fixed Income]` |
| `image` | No | path | Path to hero image — e.g. `/assets/images/chart.png`. Shows on card and post top |
| `github` | No | URL | GitHub repo link (stored in metadata, not yet rendered in UI) |
| `excerpt_separator` | No | string | Custom excerpt boundary — default is first paragraph |

---

## 10. Categories

There are three content categories, each with a dedicated landing page:

| Category | Front matter value | URL | CSS class suffix |
|---|---|---|---|
| Projects | `Projects` | `/categories/projects/` | `--projects` |
| Articles | `Articles` | `/categories/articles/` | `--articles` |
| Job Prep | `Job Prep` | `/categories/job-prep/` | `--job-prep` |

**Important:** The `category:` value in front matter must exactly match the string used in the category page's filter:

```liquid
{% assign category_posts = site.posts | where: "category", "Job Prep" %}
```

Category pages are static HTML files in `categories/`. They do not paginate — they show all posts in that category.

The homepage (`index.html`) uses the Jekyll paginator and client-side JS to filter by category without reloading.

---

## 11. Adding Images & Media

### Storing images

Place all images in `assets/images/` (create the folder if it doesn't exist):

```
assets/
  images/
    yield-curve.png
    derivatives-chart.jpg
    hero-banner.png
```

### Referencing images in posts

**Standard Markdown:**
```markdown
![Description of the image](/assets/images/yield-curve.png)
```

**With a caption (HTML inside Markdown):**
```html
<figure>
  <img src="/assets/images/yield-curve.png" alt="PCA decomposition of yield curve">
  <figcaption>Figure 1: First three PCs explain 98% of yield curve variance</figcaption>
</figure>
```

**As the post hero image** — set in front matter, not in the body:
```yaml
image: /assets/images/yield-curve.png
```

### Embedding YouTube videos

```html
<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID_HERE"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allowfullscreen>
  </iframe>
</div>
```

Replace `VIDEO_ID_HERE` with the 11-character ID from the YouTube URL.

### Embedding a PDF

```html
<iframe src="/assets/files/report.pdf" width="100%" height="600px" style="border:1px solid var(--border);border-radius:8px;"></iframe>
```

Store the PDF in `assets/files/`.

### Embedding an interactive HTML chart (e.g. Plotly)

Save the exported HTML file to `assets/charts/chart.html`, then iframe it:

```html
<iframe src="/assets/charts/chart.html" width="100%" height="500px" style="border:none;"></iframe>
```

---

## 12. Running Locally

### Prerequisites

- Ruby 3.x (installed via RubyInstaller on Windows, with DevKit)
- Bundler (`gem install bundler`)

### Commands

Open a Command Prompt (not from within VS Code — use Start menu cmd to ensure Ruby is in PATH):

```cmd
cd C:\Users\abdul\Desktop\Projects\FinanceBlog

# First time only — install dependencies
bundle install

# Start local server
bundle exec jekyll serve

# Visit in browser
http://localhost:4000
```

Jekyll watches for file changes and rebuilds automatically. Refresh the browser to see changes. Editing `_config.yml` requires a server restart.

### Windows PATH note

If `ruby` or `bundle` is not recognised in VS Code's terminal, switch the terminal type to **Command Prompt** (not PowerShell) in VS Code settings, or always use a regular cmd window from Start menu.

---

## 13. Deployment (GitHub Pages)

### Repository setup

1. Create a new GitHub repository named `FinanceBlog` (or any name)
2. Push the project: `git init`, `git add .`, `git commit -m "Initial commit"`, `git push`
3. In the repo → Settings → Pages → Source: select **main branch**, root `/`
4. GitHub Pages will build and deploy automatically on every push

### Custom domain

The `CNAME` file in the project root contains `finance.abdulmalik.de`. This tells GitHub Pages which domain to respond to.

On your domain registrar (wherever abdulmalik.de is managed), add a DNS record:

```
Type:  CNAME
Name:  finance
Value: leo-lightfoot.github.io
```

DNS propagation takes up to 48 hours. GitHub will then auto-issue an HTTPS certificate.

### Update workflow

To publish a new post:

1. Create the Markdown file in `_posts/`
2. `git add _posts/your-new-post.md`
3. `git commit -m "Add post: Your Post Title"`
4. `git push`

GitHub Pages rebuilds the site automatically within ~30 seconds.

---

## 14. Dependencies (Gemfile)

```ruby
gem "jekyll", "~> 4.3"       # Core static site generator
gem "jekyll-paginate"         # Splits post list into pages
gem "jekyll-seo-tag"          # Auto <meta> tags for SEO and social sharing
gem "jekyll-sitemap"          # Auto-generates /sitemap.xml for search engines
gem "wdm", "~> 0.1"          # Windows file watcher (Windows only)
gem "webrick", "~> 1.8"      # Ruby dev server (required for Ruby 3+)
```

After editing the Gemfile, run `bundle install` to apply changes.

---

*Documentation covers the state of the blog as of March 2026.*

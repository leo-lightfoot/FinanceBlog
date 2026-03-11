# Finance Blog — Documentation

**Site:** finance.abdulmalik.de
**Generator:** Jekyll 4.3 (Ruby static site generator)
**Hosting:** GitHub Pages
**Last updated:** March 2026

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Writing Posts](#2-writing-posts)
3. [Front Matter Reference](#3-front-matter-reference)
4. [Categories](#4-categories)
5. [Adding Images & Media](#5-adding-images--media)
6. [Site Features](#6-site-features)
7. [Running Locally](#7-running-locally)
8. [Deployment](#8-deployment)
9. [Dependencies](#9-dependencies)

---

## 1. Project Structure

```
FinanceBlog/
│
├── _config.yml              # Global site settings — author info, plugins, etc.
├── Gemfile                  # Ruby gem dependencies
├── CNAME                    # Custom domain (finance.abdulmalik.de)
├── index.html               # Homepage
├── 404.html                 # Custom "page not found" page
├── robots.txt               # Search engine crawler instructions
│
├── _layouts/                # Page templates
│   ├── default.html         # Base template (head, header, footer, analytics)
│   ├── home.html            # Homepage: hero, category filter, post grid
│   └── post.html            # Individual post: header, body, author card, related posts
│
├── _includes/               # Reusable HTML fragments
│   ├── header.html          # Navigation bar
│   └── footer.html          # Footer
│
├── _posts/                  # All blog posts (Markdown files)
│   └── YYYY-MM-DD-slug.md   # Filename format is mandatory
│
├── categories/              # Category landing pages
│   ├── projects.html        # /categories/projects/
│   ├── articles.html        # /categories/articles/
│   └── job-prep.html        # /categories/job-prep/
│
├── assets/
│   ├── css/main.css         # All site styling
│   ├── js/main.js           # Theme toggle, spotlight effect, category filter
│   └── images/              # Post images, hero banners, favicon
│       └── favicon.svg      # Site favicon (dark navy, "AM" in blue)
│
└── _site/                   # Auto-generated build output — NEVER edit this folder
```

---

## 2. Writing Posts

### Step 1 — Create the file

All posts go in `_posts/`. The filename format is **mandatory**:

```
_posts/YYYY-MM-DD-your-post-slug.md
```

The date in the filename sets the post date. The slug becomes the URL.

### Step 2 — Write the front matter

Every post starts with a YAML block:

```yaml
---
layout: post
title: "Your Post Title"
subtitle: "Optional one-line description"
category: Projects
date: 2026-04-01
tags: [Python, Finance, Risk]
image: /assets/images/your-image.jpg
github: "https://github.com/..."
---
```

### Step 3 — Write content in Markdown

```markdown
## Section heading

Normal paragraph. **Bold.** *Italic.*

### Sub-heading

- Bullet point

> Blockquote — renders with a blue left border

Inline `code` looks like this.
```

Code block with syntax highlighting:

    ```python
    import numpy as np
    result = np.mean([1, 2, 3])
    ```

```markdown
| Column A | Column B |
|----------|----------|
| Value 1  | Value 2  |

[Link text](https://example.com)
```

### Generated URL

`_posts/2026-04-01-black-scholes.md` becomes:
```
https://finance.abdulmalik.de/2026/04/01/black-scholes/
```

---

## 3. Front Matter Reference

| Field | Required | Description |
|-------|----------|-------------|
| `layout` | Yes | Always `post` |
| `title` | Yes | Shown on the card and post page |
| `category` | Yes | Must be exactly `Projects`, `Articles`, or `Job Prep` |
| `date` | Yes | `YYYY-MM-DD` |
| `subtitle` | No | Short description shown under the title |
| `tags` | No | List of strings — e.g. `[Python, PCA, Fixed Income]` |
| `image` | No | Path to hero image — e.g. `/assets/images/chart.png` |
| `github` | No | GitHub repo URL (stored in metadata for future use) |

---

## 4. Categories

Three categories, each with a dedicated landing page:

| Category | Front matter value | URL |
|----------|--------------------|-----|
| Projects | `Projects` | `/categories/projects/` |
| Articles | `Articles` | `/categories/articles/` |
| Job Prep | `Job Prep` | `/categories/job-prep/` |

The `category:` value must match exactly — capitalisation matters.

The homepage filters by category without reloading the page. Category landing pages show all posts in that category without pagination.

---

## 5. Adding Images & Media

### Storing files

Place all images in `assets/images/`:

```
assets/images/
  yield-curve.png
  hero-banner.jpg
```

Place PDFs in `assets/files/` and interactive charts in `assets/charts/`.

### Image in post body

```markdown
![Description](/assets/images/yield-curve.png)
```

With a caption:

```html
<figure>
  <img src="/assets/images/yield-curve.png" alt="Yield curve PCA">
  <figcaption>Figure 1: First three PCs explain 98% of variance</figcaption>
</figure>
```

### Hero image

Set in front matter — appears at the top of the post and on the homepage card:

```yaml
image: /assets/images/yield-curve.png
```

This also becomes the preview image when the post is shared on LinkedIn or other platforms.

### Embedding a YouTube video

```html
<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    allowfullscreen>
  </iframe>
</div>
```

Replace `VIDEO_ID` with the 11-character ID from the YouTube URL.

### Embedding a PDF

```html
<iframe src="/assets/files/report.pdf" width="100%" height="600px" style="border:1px solid var(--border);border-radius:8px;"></iframe>
```

### Embedding an interactive Plotly chart

Export the chart as an HTML file to `assets/charts/chart.html`, then embed it:

```html
<iframe src="/assets/charts/chart.html" width="100%" height="500px" style="border:none;"></iframe>
```

---

## 6. Deployment

### Publishing a new post

```bash
git add _posts/your-new-post.md
git commit -m "Add post: Your Post Title"
git push
```

GitHub Pages rebuilds the site automatically within ~30 seconds of every push.

### Changing site-wide settings

Edit `_config.yml` — author name, description, and social links all propagate across every page from there.

---

## 79. Dependencies

| Gem | Purpose |
|-----|---------|
| `jekyll ~> 4.3` | Static site generator |
| `jekyll-paginate` | Splits post list across pages (8 per page) |
| `jekyll-seo-tag` | Injects SEO and Open Graph meta tags |
| `jekyll-sitemap` | Auto-generates `/sitemap.xml` |
| `jekyll-feed` | Auto-generates `/feed.xml` RSS feed |
| `wdm ~> 0.1` | Windows file watcher (Windows only) |
| `webrick ~> 1.8` | Local dev server (required for Ruby 3+) |

After editing `Gemfile`, run `bundle install` to apply changes.

---

*Last updated March 2026*

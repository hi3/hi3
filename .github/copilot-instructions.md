# hi3 AI Coding Instructions

A minimal personal site built with **Hugo** (static site generator) and **Tailwind CSS v4** with a custom theme.

## Security

**Security is paramount.** All changes must consider security implications:
- Only use official, trusted dependencies (prefer GitHub/npm verified publishers)
- Avoid third-party GitHub Actions from unknown sources
- Validate and sanitize any user-facing inputs
- Review external resources (fonts, scripts, CDNs) for integrity
- Keep dependencies updated to patch known vulnerabilities

## Architecture Overview

- **Hugo**: Generates static HTML from Markdown content + Go templates
- **Tailwind CSS v4**: Handles styling with CSS-first configuration and Solarized color palette
- **Build Process**: `npm run build` runs Tailwind CLI then Hugo sequentially (see `package.json` scripts)
- **Theme**: Custom `themes/hi3/` with partials-based component structure

### Key Directories
- `content/` - Markdown pages (`_index.md` is homepage)
- `themes/hi3/layouts/` - Hugo templates
  - `_default/baseof.html` - Base template wrapper
  - `_default/{songs,work}.html` - Page-specific layouts
  - `partials/body/` - Reusable components (header, footer, social, etc.)
  - `partials/head/` - Head section partials (fonts, stylesheets, meta)
- `themes/hi3/assets/css/` - Source CSS files (Tailwind input + overrides)

## Content Structure Pattern

Each page in `content/` requires:
1. Markdown file with front matter specifying `layout` field
2. Corresponding template in `themes/hi3/layouts/_default/{layout}.html`

Example from `content/work.md`:
```yaml
---
title: "work"
layout: "work"
---
```

Maps to `themes/hi3/layouts/_default/work.html`.

## Styling Conventions

- **Color System**: Solarized palette (defined in `main.css` via `@theme` block)
  - Primary: `base03`, `base02`, `base01`, `base00`, `base0`, `base1`, `base2`, `base3`
  - Accents: `blue` (primary), `orange`, `red`, `magenta`, etc.
  - Example: `text-blue`, `bg-gradient-to-tr from-base03 to-base02`
  - CSS Variables: `--color-base03`, `--color-blue`, etc.

- **Typography**: Orbitron font for headings (imported via Google Fonts, configured in `@theme` block)
- **Layout Grid**: Tailwind Flexbox with `h-screen` sections
- **Responsive**: Standard Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- **Custom Utilities**: Glow effects defined in `@layer utilities` (`.glow-lg`, `.glow-blue-500`, `.glow-red-500`)

### CSS Pipeline (Tailwind v4)
1. `themes/hi3/assets/css/main.css` - Tailwind v4 CSS input with CSS-first configuration
   - `@import "tailwindcss"` - Core Tailwind v4
   - `@theme { }` - Design tokens (colors, fonts)
   - `@layer utilities` - Custom utilities (glow effects)
   - `@plugin "@tailwindcss/typography"` - Typography plugin
2. Tailwind CLI v4 scans templates for class names automatically
3. Output: `themes/hi3/assets/css/style.css` (watched in dev, minified in build)
4. **No `tailwind.config.js`** - Configuration moved to CSS

## Build & Development Workflow

### Start Development
```bash
npm run start
```
Runs concurrently:
- Hugo server with live reload (`hugo server` bound to network IP)
- Tailwind watcher compiling CSS changes

### Build Production
```bash
npm run build
```
Generates minified output to `public/` directory.

### Deploy
```bash
make push
```
Uses rsync to deploy `public/` to production server (requires SSH access).

## Template Patterns

### Page Layout Structure
From `layouts/_default/baseof.html`:
```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
{{ partial "head/head.html" . }}
<body class="w-full bg-gradient-to-tr from-base03 to-base02 min-h-screen">
    <main class="h-screen w-full min-h-screen">
{{ block "main" . }}{{ end }}
    </main>
</body>
</html>
```

Define layouts by creating `_default/{name}.html` with `{{ define "main" }}...{{ end }}` blocks.

### Partial Components
Located in `partials/body/` and `partials/head/`:
- `header.html` - Site title (Orbitron font, blue text)
- `footer.html` - Copyright notice
- `social.html` - Social media links (GitHub, GitLab, LinkedIn, etc.)
- Social partials: `social/{facebook,github,gitlab,linkedin,spotify,twitter}.html`

Use `{{ partial "path/to/partial.html" . }}` to include.

## Configuration

### Hugo Config (`hugo.toml`)
- Base URL: `https://hi3.me/`
- Disables sections, taxonomies, RSS, sitemaps
- Social links defined as array: `[[params.social]]`
- Color palette in `[params.palette]` (text color via Solarized base00)

### Tailwind v4 CSS Config (`themes/hi3/assets/css/main.css`)
- **No `tailwind.config.js`** - Tailwind v4 uses CSS-first configuration
- Import order (strict):
  1. Google Fonts (`@import url(...)`)
  2. `@import "tailwindcss"`
  3. Local CSS files (e.g., `./solarized/solarized.css`)
  4. `@plugin "@tailwindcss/typography"`
  5. `@theme { }` - Design tokens (CSS variables)
  6. `@layer base { }` - Base styles
  7. `@layer utilities { }` - Custom utilities
- Content scanning is automatic (no explicit paths needed)
- Typography plugin handles code/prose styling (backtick removal in `@layer base`)

## Common Tasks

- **Add new page**: Create `content/pagename.md` with layout field + corresponding `layouts/_default/pagename.html` template
- **Update header/footer**: Edit `partials/body/{header,footer}.html`
- **Add social link**: Update `[[params.social]]` in `hugo.toml` + create partial in `partials/body/social/`
- **Change colors**: Modify Solarized values in `main.css` `@theme` block or use Tailwind class names directly
- **Add fonts**: Import in `partials/head/fonts.html`, declare in Tailwind `theme.fontFamily`

## External Dependencies

- Hugo >= 0.41.0 (current: v0.155.2)
- Node.js (npm scripts, Tailwind CLI)
- Tailwind CSS v4.1.18 (with `@tailwindcss/cli` and `@tailwindcss/typography`)
- Concurrently v8.2.2 for parallel dev tasks
- **No PostCSS** - Tailwind v4 CLI handles compilation directly

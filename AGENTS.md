# People Medicine

A static single-page site (plain HTML/CSS/JS, no build step, no backend, no external services).

## Setup

Files were imported with descriptive suffixes in their names
(`script.js (Interactivity) javascript`, `styles.css (Styling)`). They are
renamed to `script.js` and `styles.css`, and `index.html` was given a proper
document structure that links `styles.css` and loads `script.js`.

## Run

```
docker compose -f docker-compose.base44.yml up -d
```

nginx:alpine serves the repo root on host port 3000. Source is bind-mounted
read-only, so edits appear on a browser refresh (no live-reload server).

## Verify

- `curl -I http://localhost:3000/index.html` → 200
- Open the preview; select a disease and click Search to see results populate.

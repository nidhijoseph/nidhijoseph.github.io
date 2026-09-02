# Nidhi Joseph — Portfolio

Personal portfolio site for Nidhi Joseph, a visual communication and interaction
designer based in Melbourne.

## Running it locally

The site is a single React component compiled in the browser, so there is no
build step and nothing to install. Serve the folder over HTTP and open
`preview.html`:

```
python3 -m http.server 8899
```

Then visit http://localhost:8899/preview.html

Opening `preview.html` directly from the filesystem will not work — the browser
blocks the `fetch` of the JSX file.

## Layout

- `portfolio-draft.jsx` — the whole site: markup, styles and behaviour
- `preview.html` — Babel harness that compiles and mounts the component
- `assets/` — web-sized images the site actually loads
- one folder per project — original photography, artwork and video

## Projects

Archive Fever · Carlsbad Caverns · Class Pulse · Crochet · MOHA · Paintings ·
Sundae · That Ikigai Project · Why Axis

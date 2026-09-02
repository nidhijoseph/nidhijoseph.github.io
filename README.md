# Nidhi Joseph — Portfolio

Personal portfolio site for Nidhi Joseph, a visual communication and interaction
designer based in Melbourne.

Live at **https://nidhijoseph.github.io**

## Layout

- `index.html` — the published page
- `bundle.js` — the built site (generated; do not edit by hand)
- `portfolio-draft.jsx` — the source: markup, styles and behaviour, all in one file
- `src/main.jsx` — mounts the component
- `assets/` — web-sized images the site loads
- one folder per project — original photography, artwork and video

## Making a change

Edit `portfolio-draft.jsx`, then rebuild:

```
npm install     # first time only
npm run build
```

Commit the updated `bundle.js` along with your source change — GitHub Pages
serves the built file, so a change is not live until the bundle is rebuilt.

To preview while editing, run `npm run watch` in one terminal and a web server
in another:

```
python3 -m http.server 8899
```

Then open http://localhost:8899. Opening `index.html` straight from Finder will
not work — the browser blocks local file access.

`preview.html` is an older harness that compiles the JSX in the browser. It
needs no build step, which is handy for quick edits, but it is slower to load
and is not what visitors see.

## Projects

Archive Fever · Carlsbad Caverns · Class Pulse · Crochet · MOHA · Paintings ·
Sundae · That Ikigai Project · Why Axis

# Hero mockups

`heroes.py` rebuilds the ClassPulse and MOHA hero collages in `assets/`.

Every phone in both is drawn by the single frame in `iphone.py`, so they cannot
drift apart. `unframe.py` strips a capture back to its display first — the MOHA
screens were exported with a phone already drawn around them, which is why those
two projects used to look like they came from different mockup kits.

To rebuild after replacing a screen:

    python3 -m venv venv && ./venv/bin/pip install Pillow
    ./venv/bin/python tools/heroes.py

Screens live in `Class Pulse/ClassPulse screens for hero image/` and
`MOHA/MOHA screens for hero image/`. They may be any height — each is scaled to
the display's width and anchored at the top, so a long scrolling capture reads
as a screen you could scroll rather than being squashed to fit.

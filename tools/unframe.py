"""Recover the bare screen from a capture that already has a phone drawn round it.

The MOHA screens were exported with their own titanium rail, black bezel and
island baked in; the ClassPulse ones are bare. Framing both with the site's
frame gave MOHA a phone inside a phone, which is most of why the mockups looked
like they came from different places. This strips a capture back to the display
so every screen can be framed the same way.
"""
from PIL import Image


def _alpha_box(px, w, h):
    xs = [x for x in range(w) if any(px[x, y][3] > 8 for y in range(0, h, 5))]
    ys = [y for y in range(h) if any(px[x, y][3] > 8 for x in range(0, w, 5))]
    return (xs[0], ys[0], xs[-1], ys[-1]) if xs and ys else (0, 0, w - 1, h - 1)


def _dark(c):
    return c[3] > 200 and (c[0] + c[1] + c[2]) < 190


def screen_of(path, bezel_min=4):
    """Return the display area as an RGB image, or the whole file if unframed.

    A framed capture reads, from the edge inwards: transparency, a light rail, a
    black bezel, then the screen. Finding a run of dark pixels of at least
    `bezel_min` and taking what follows is what separates the two cases — a bare
    screenshot has no such run and is returned untouched.
    """
    im = Image.open(path).convert("RGBA")
    w, h = im.size
    px = im.load()
    x0, y0, x1, y1 = _alpha_box(px, w, h)
    cy, cx = (y0 + y1) // 2, (x0 + x1) // 2

    def walk(start, end, step, fixed, horizontal):
        run = 0
        for i in range(start, end, step):
            c = px[i, fixed] if horizontal else px[fixed, i]
            if _dark(c):
                run += 1
            elif run >= bezel_min and c[3] > 200:
                return i          # first pixel of the screen
            elif c[3] > 200:
                run = 0
        return None

    left   = walk(x0, x1, 1,  cy, True)
    right  = walk(x1, x0, -1, cy, True)
    top    = walk(y0, y1, 1,  cx, False)
    bottom = walk(y1, y0, -1, cx, False)

    if None in (left, right, top, bottom) or right - left < w * 0.4:
        return im.convert("RGB")   # nothing framed here — use it as it is
    return im.crop((left, top, right + 1, bottom + 1)).convert("RGB")

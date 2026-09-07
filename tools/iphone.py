"""One iPhone frame, drawn the same way every time.

The hero collages were built by hand and the frames drifted: some screens were
taller than the frame and were cut off at the bottom, and one had no bezel at
all. Every phone here comes from this one function, so they cannot disagree.

The proportions are an iPhone 15/16 Pro: a 1206x2622 display (0.460), a
titanium rail, an even black bezel, rounded corners and the Dynamic Island.
"""
from PIL import Image, ImageDraw, ImageFilter

SCREEN_RATIO = 1206 / 2622          # the display's own aspect


def _rounded_mask(size, radius, ss=4):
    """A crisp rounded rectangle, drawn large and resampled down."""
    w, h = size
    m = Image.new("L", (w * ss, h * ss), 0)
    ImageDraw.Draw(m).rounded_rectangle(
        [0, 0, w * ss - 1, h * ss - 1], radius=radius * ss, fill=255
    )
    return m.resize((w, h), Image.LANCZOS)


def fit_screen(img, target_w, target_h):
    """Fill the display area, anchored at the top.

    Screens were captured at different heights — 874, 945 and 1583 pixels tall
    against the same 402 width. Scaling each to the display's width and taking
    the top is what keeps a design's own spacing intact; the alternative,
    squeezing it to fit, distorts the layout it is meant to show.
    """
    img = img.convert("RGB")
    w, h = img.size
    scale = target_w / w
    new_h = max(target_h, int(round(h * scale)))
    img = img.resize((target_w, new_h), Image.LANCZOS)
    return img.crop((0, 0, target_w, target_h))


def render_screen(screen_img, width, island=True):
    """An iPhone at `width` pixels across, wrapped round an already-bare screen."""
    body_w = int(width)
    body_h = int(round(body_w / SCREEN_RATIO))

    rail = max(3, round(body_w * 0.0115))      # titanium edge
    bezel = max(3, round(body_w * 0.0125))     # black surround
    r_body = round(body_w * 0.148)
    r_screen = max(1, r_body - rail - bezel)

    card = Image.new("RGBA", (body_w, body_h), (0, 0, 0, 0))

    # titanium rail, brightest at the top-left and bottom-right edges
    rail_img = Image.new("RGB", (body_w, body_h), "#1a1a1e")
    rd = ImageDraw.Draw(rail_img)
    for y in range(body_h):
        t = y / max(1, body_h - 1)
        if t < 0.12:      c = (74, 74, 79)
        elif t < 0.34:    c = (35, 35, 39)
        elif t < 0.56:    c = (13, 13, 15)
        elif t < 0.78:    c = (28, 28, 32)
        else:             c = (61, 61, 66)
        rd.line([(0, y), (body_w, y)], fill=c)
    card.paste(rail_img, (0, 0), _rounded_mask((body_w, body_h), r_body))

    # black bezel between rail and glass
    inner_w, inner_h = body_w - 2 * rail, body_h - 2 * rail
    bez = Image.new("RGB", (inner_w, inner_h), "#050506")
    card.paste(bez, (rail, rail), _rounded_mask((inner_w, inner_h), r_body - rail))

    # the display
    sx, sy = rail + bezel, rail + bezel
    sw, sh = body_w - 2 * sx, body_h - 2 * sy
    shot = fit_screen(screen_img, sw, sh)
    card.paste(shot, (sx, sy), _rounded_mask((sw, sh), r_screen))

    d = ImageDraw.Draw(card)
    if island:
        iw, ih = round(body_w * 0.265), round(body_w * 0.072)
        ix, iy = (body_w - iw) // 2, sy + round(body_h * 0.011)
        d.rounded_rectangle([ix, iy, ix + iw, iy + ih], radius=ih // 2, fill=(0, 0, 0, 255))

    # side buttons, sitting just proud of the rail
    btn = (60, 60, 65, 255)
    bw = max(2, round(body_w * 0.008))
    for top, height in ((0.175, 0.042), (0.245, 0.072), (0.335, 0.072)):
        y0 = round(body_h * top)
        d.rounded_rectangle([-bw, y0, bw, y0 + round(body_h * height)], radius=bw, fill=btn)
    y0 = round(body_h * 0.232)
    d.rounded_rectangle([body_w - bw, y0, body_w + bw, y0 + round(body_h * 0.112)],
                        radius=bw, fill=btn)
    return card


def drop_shadow(card, blur=26, dy=14, opacity=150):
    """A soft shadow cast by the phone's own silhouette."""
    pad = blur * 3
    w, h = card.size
    sh = Image.new("RGBA", (w + pad * 2, h + pad * 2), (0, 0, 0, 0))
    silhouette = Image.new("RGBA", (w, h), (0, 0, 0, opacity))
    sh.paste(silhouette, (pad, pad + dy), card)
    return sh.filter(ImageFilter.GaussianBlur(blur)), pad

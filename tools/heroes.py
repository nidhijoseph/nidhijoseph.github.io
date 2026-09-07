"""Rebuild the ClassPulse and MOHA hero collages.

Every phone comes from one frame function, and every screen is reduced to its
display first — the MOHA captures arrived with a phone already drawn around
them, which is what made the two projects look like they used different
mockups.
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from PIL import Image, ImageDraw, ImageFont
from iphone import render_screen, drop_shadow
from unframe import screen_of

ROOT = "/Users/nidhijoseph/Desktop/portfolio folders"
W, H = 1920, 1140

FONT_DIRS = ["/System/Library/Fonts/Supplemental", "/System/Library/Fonts", "/Library/Fonts"]


def font(name, size):
    for d in FONT_DIRS:
        p = os.path.join(d, name)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def wash(size, top, bottom):
    w, h = size
    g = Image.new("RGB", (1, h))
    d = ImageDraw.Draw(g)
    for y in range(h):
        t = y / max(1, h - 1)
        d.point((0, y), fill=tuple(round(top[i] + (bottom[i] - top[i]) * t) for i in range(3)))
    return g.resize((w, h), Image.BICUBIC)


def place(canvas, rel_path, width, cx, cy):
    card = render_screen(screen_of(os.path.join(ROOT, rel_path)), width)
    sh, pad = drop_shadow(card)
    canvas.alpha_composite(sh, (round(cx - card.width / 2) - pad, round(cy - card.height / 2) - pad))
    canvas.alpha_composite(card, (round(cx - card.width / 2), round(cy - card.height / 2)))
    return card.size


def classpulse():
    bg = wash((W, H), (206, 236, 248), (166, 213, 235)).convert("RGBA")
    d = ImageDraw.Draw(bg)
    d.text((96, 462), "ClassPulse", font=font("Arial Bold.ttf", 104), fill=(17, 74, 92))
    d.text((99, 600), "Student Engagement Platform", font=font("Arial.ttf", 40), fill=(31, 111, 134))

    S = "Class Pulse/ClassPulse screens for hero image"
    top = ["classpulse-checkinoptions.png", "classpulse-home.png",
           "classpulse-journalthread.png", "classpulse-profile.png"]
    bot = ["classpulse-capturethoughts.png", "classpulse-journal.png",
           "classpulse-checkinenergied.png", "classpulse-attendance.png"]

    pw, gap = 246, 275
    for i, s in enumerate(top):
        place(bg, f"{S}/{s}", pw, 800 + i * gap, 310)
    for i, s in enumerate(bot):
        place(bg, f"{S}/{s}", pw, 937 + i * gap, 800)
    return bg


def moha():
    bg = Image.new("RGBA", (W, H), (231, 217, 176, 255))
    d = ImageDraw.Draw(bg)
    d.text((110, 424), "MOHA", font=font("Arial Bold.ttf", 118), fill=(122, 90, 30))
    d.text((113, 566), "Museum Application", font=font("Arial.ttf", 42), fill=(139, 109, 49))

    S = "MOHA/MOHA screens for hero image"
    for i, s in enumerate(["moha-artist.png", "moha-merch.png", "moha-cart.png"]):
        place(bg, f"{S}/{s}", 328, 880 + i * 390, 570)
    return bg


for name, img in (("classpulse-hero.jpg", classpulse()), ("moha-hero.jpg", moha())):
    out = os.path.join(ROOT, "assets", name)
    Image.alpha_composite(Image.new("RGBA", img.size, (255, 255, 255, 255)), img)\
         .convert("RGB").save(out, "JPEG", quality=90, optimize=True)
    print(f"  wrote {name}  {img.size[0]}x{img.size[1]}")

"""Timber Chronology — Abuzar Industries brand poster"""
from PIL import Image, ImageDraw, ImageFont
import math, random, os

W, H = 1200, 1600
CW = 600
BASE = os.path.dirname(os.path.abspath(__file__))
FD = os.path.join(os.path.dirname(os.path.dirname(BASE)), ".claude", "skills", "canvas-design", "canvas-fonts")
OUT = os.path.join(BASE, "abuzar-brand-poster.png")

def _mask_img(font_path, size, text):
    """Return an RGBA Image with the text rendered on it"""
    fp = os.path.join(FD, font_path)
    if not os.path.exists(fp):
        return None
    f = ImageFont.truetype(fp, size)
    mask = f.getmask(text)
    bw, bh = mask.size
    # Convert mask to PIL Image
    mask_bytes = bytes(mask)
    mask_img = Image.frombuffer('L', (bw, bh), mask_bytes, 'raw', 'L', 0, 1)
    return mask_img, bw, bh

def text_layer(text, font_path, size, color):
    """Create an RGBA image layer with text rendered"""
    r = _mask_img(font_path, size, text)
    if r is None:
        return None
    mask_img, bw, bh = r
    # Create colored text + alpha from mask
    layer = Image.new('RGBA', (bw, bh), (0, 0, 0, 0))
    fill = Image.new('RGBA', (bw, bh), (*color, 255))
    fill.putalpha(mask_img)
    return fill

def place_text(canvas, text, font_path, size, cx, cy, color, anchor='mm'):
    """Place text on canvas centered at (cx, cy)"""
    layer = text_layer(text, font_path, size, color)
    if layer is None:
        return
    bw, bh = layer.size
    if anchor == 'mm':
        x = cx - bw // 2
        y = cy - bh // 2
    else:
        x, y = cx, cy
    canvas.paste(layer, (x, y), layer)

# ── base canvas ──
base = Image.new('RGBA', (W, H), (42, 32, 24, 255))
draw = ImageDraw.Draw(base)

# ── warm glow ──
for r in range(900, 0, -6):
    a = max(0, int(35 - 35 * r / 900))
    draw.ellipse([CW-r, 700-r, CW+r, 700+r], fill=(70, 50, 32, a))

# ── paper circle ──
draw.ellipse([CW-310, 150, CW+310, 770], fill=(230, 223, 212, 255))

# ── tree rings ──
rings = [280, 255, 230, 208, 188, 170, 154, 140, 128, 117, 107, 98, 90, 82, 75, 68, 62]
for i, r in enumerate(rings):
    a = int(180 - i * 8)
    draw.ellipse([CW-r, 460-r, CW+r, 460+r], outline=(40, 28, 16, a), width=4)
draw.ellipse([CW-12, 448-12, CW+12, 448+12], fill=(185, 119, 46, 255))

# ── radial lines ──
for angle in range(0, 360, 8):
    rad = math.radians(angle)
    x1 = CW + 295 * math.cos(rad)
    y1 = 460 + 295 * math.sin(rad)
    x2 = CW + 410 * math.cos(rad)
    y2 = 460 + 410 * math.sin(rad)
    draw.line([(x1, y1), (x2, y2)], fill=(40, 28, 16, 18), width=1)

# ── planks ──
for i in range(22):
    y = 545 + i * 15
    w = 360 + random.randint(-60, 60)
    draw.rectangle([CW-w//2, y, CW+w//2, y+10], fill=(50, 38, 26, 50))
    draw.line([(CW-w//2, y+10), (CW+w//2, y+10)], fill=(50, 38, 26, 70), width=1)

# ── title ──
place_text(base, 'ABUZAR', 'Outfit-Bold.ttf', 120, CW, 220, (36, 24, 14))
place_text(base, 'INDUSTRIES', 'Outfit-Bold.ttf', 80, CW, 330, (36, 24, 14))
place_text(base, "CHITRADURGA'S TIMBER HOUSE", 'InstrumentSans-Regular.ttf', 22, CW, 170, (185, 119, 46))
place_text(base, 'EST. 1995  ·  THREE GENERATIONS', 'JetBrainsMono-Regular.ttf', 18, CW, 415, (70, 50, 30))

# gold rule
for dx in range(-220, 221, 3):
    a = max(0, int(220 - abs(dx) * 1.0))
    draw.rectangle([CW+dx-1, 360, CW+dx+1, 363], fill=(199, 154, 75, a))

# ── legend ──
legends = [
    '//  IMPORTED TEAK  —  Ghana, Togo & Burma',
    '//  WHITE TEAK · NEEM  —  Seasoned & graded',
    '//  CUSTOM DIMENSION CUTTING  —  Any L × W × T',
    '//  DELIVERY  —  Across Karnataka',
]
for i, t in enumerate(legends):
    place_text(base, t, 'InstrumentSans-Regular.ttf', 16, CW - 240, 920 + i * 40, (60, 42, 26), 'lt')

# ── tagline ──
place_text(base, 'Three generations of timber craft since 1995', 'CrimsonPro-Italic.ttf', 26, CW, 1150, (230, 215, 195))

# ── badges ──
for i, b in enumerate(['TRUSTED SINCE 1995', 'CUSTOM CUT SIZES', 'ACROSS KARNATAKA']):
    bx = CW + (i - 1) * 230
    draw.rounded_rectangle([bx-90, 1300, bx+90, 1330], radius=10, fill=(60, 42, 26, 80), outline=(185, 119, 46, 50))
    place_text(base, b, 'InstrumentSans-Bold.ttf', 12, bx, 1315, (220, 200, 180))

# ── dots ──
for _ in range(150):
    x = random.randint(20, W-20)
    y = random.randint(20, H-20)
    if 150 < y < 770:
        continue
    r = random.random() * 2.5
    draw.ellipse([x-r, y-r, x+r, y+r], fill=(50, 38, 26, 30))

# ── border ──
draw.rectangle([12, 12, W-13, H-13], outline=(185, 119, 46, 40), width=2)

# ── flatten to RGB ──
final = Image.new('RGB', (W, H), (42, 32, 24))
final.paste(base, (0, 0), base)
final.save(OUT, 'PNG')
print(f"Saved: {OUT} ({os.path.getsize(OUT)//1024}KB)")

# Verify
chk = Image.open(OUT)
for (x, y, label) in [(600, 220, 'title'), (600, 170, 'eyebrow'), (600, 1150, 'tagline'), (10, 10, 'corner')]:
    print(f'  {label} ({x},{y}): {chk.getpixel((x,y))}')

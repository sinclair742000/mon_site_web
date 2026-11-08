#!/usr/bin/env python3
"""Prépare une photo pour le site : recadrage, redimensionnement et export
en AVIF, WebP et JPG (plusieurs largeurs, pour les images responsives).

Utilisation :
    python3 outils/optimiser_photos.py SOURCE NOM [--ratio 4:5] [--focus 0.5,0.4]
                                       [--largeurs 480,720,960]

Exemple (photo du hero) :
    python3 outils/optimiser_photos.py ma-photo.jpg hero --ratio 4:5 \
        --focus 0.55,0.4 --largeurs 640,960,1280

Les fichiers sont écrits dans assets/img/photos/NOM-<largeur>.{avif,webp,jpg}.
--focus indique le point à garder au centre du recadrage (0,0 = haut gauche,
1,1 = bas droite). Nécessite Pillow (pip install pillow).
"""
import argparse
from pathlib import Path

from PIL import Image, ImageOps

SORTIE = Path(__file__).resolve().parent.parent / "assets" / "img" / "photos"


def recadrer(img, ratio, fx, fy):
    """Recadre img au ratio largeur/hauteur demandé, centré sur (fx, fy)."""
    w, h = img.size
    if w / h > ratio:                       # trop large : on coupe sur les côtés
        cw = round(h * ratio)
        x0 = min(max(round(fx * w - cw / 2), 0), w - cw)
        return img.crop((x0, 0, x0 + cw, h))
    ch = round(w / ratio)                   # trop haute : on coupe en haut / en bas
    y0 = min(max(round(fy * h - ch / 2), 0), h - ch)
    return img.crop((0, y0, w, y0 + ch))


def main():
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    p.add_argument("source")
    p.add_argument("nom")
    p.add_argument("--ratio", default="4:5", help="largeur:hauteur, ex. 4:5 ou 2:3")
    p.add_argument("--focus", default="0.5,0.5", help="point à garder, ex. 0.5,0.4")
    p.add_argument("--largeurs", default="480,720,960")
    a = p.parse_args()

    rw, rh = (float(x) for x in a.ratio.split(":"))
    fx, fy = (float(x) for x in a.focus.split(","))
    largeurs = [int(x) for x in a.largeurs.split(",")]

    img = ImageOps.exif_transpose(Image.open(a.source)).convert("RGB")
    img = recadrer(img, rw / rh, fx, fy)
    SORTIE.mkdir(parents=True, exist_ok=True)

    for lw in largeurs:
        lw = min(lw, img.width)
        lh = round(lw * img.height / img.width)
        r = img.resize((lw, lh), Image.LANCZOS)
        base = SORTIE / f"{a.nom}-{lw}"
        r.save(f"{base}.avif", quality=52, speed=4)
        r.save(f"{base}.webp", quality=74, method=6)
        r.save(f"{base}.jpg", quality=78, optimize=True, progressive=True)
        tailles = ", ".join(f"{ext} {Path(f'{base}.{ext}').stat().st_size // 1024} Ko" for ext in ("avif", "webp", "jpg"))
        print(f"{a.nom}-{lw} ({lw}x{lh}) : {tailles}")


if __name__ == "__main__":
    main()

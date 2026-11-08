# mon_site_web — Horizon Monde

Site d'**Horizon Monde**, plateforme d'opportunités internationales : voyages, études et
mobilité internationale. Horizon Monde informe, oriente et accompagne, puis met en relation
avec ses partenaires (dont une agence de voyage partenaire pour la Turquie).

Site statique (HTML, CSS et JavaScript, sans outil de compilation) : il suffit d'ouvrir
`index.html` dans un navigateur.

## Avancement (une étape à la fois)

| Étape | Contenu | État |
|-------|---------|------|
| Accueil — en-tête + hero + « Quel horizon envisagez-vous ? » | `index.html` | ✅ Validé |
| Accueil — Destinations & programmes (Turquie à la une, Chine, TCF) | `index.html` | ✅ Validé |
| Accueil — Comment ça marche (frise en 4 étapes) | `index.html` | ✅ Validé |
| Accueil — Transparence (Horizon Monde / partenaires) + harmonisation des fonds | `index.html` | ✅ Validé |
| Accueil — Réseaux (WhatsApp, Facebook, Instagram, TikTok) | `index.html` | ✅ Validé |
| Accueil — appel final (arche) et nouveau pied de page | `index.html` | ✅ Validé |
| Accueil — fonds en dégradés « le ciel au fil de la journée » (globe, ciel, lever et coucher de soleil) | `index.html` | ✅ Validé |
| Page Destinations (Turquie à la une, Chine, renvoi TCF) | `destinations.html` | ✅ À valider |
| Pages Opportunités, Services (dont TCF), Comment ça marche, À propos, Contact | à créer | À faire |

Le menu renvoie déjà vers les pages prévues ; les liens fonctionneront au fur et à mesure.

## Structure

```
index.html                Page d'accueil
destinations.html         Page Destinations (Turquie, Chine, renvoi vers le TCF)
assets/css/style.css      Styles communs à toutes les pages
assets/js/main.js         Script commun (liens WhatsApp, menu mobile, animations)
assets/img/               Logo, emblème, favicon, image de partage
assets/img/photos/        Photos optimisées (AVIF, WebP, JPG en plusieurs largeurs)
assets/img/globe.svg      Globe filaire : routes depuis Yaoundé (Istanbul, Paris, Shanghai, Montréal)
outils/optimiser_photos.py  Script de préparation des photos
```

## Photos

Photos provisoires issues d'Unsplash (licence Unsplash : usage commercial gratuit, sans
attribution obligatoire). Pour une communication publicitaire, une séance photo dédiée ou
des photos sous licence avec autorisation des modèles est recommandée.

| Fichier | Photo Unsplash |
|---------|----------------|
| `hero-*`, `hero-mobile-*` | `photo-1589156280159-27698a70f29e` |
| `voyager-*`, `cappadoce-mini-*` | `photo-1530789253388-582c481c54b0` |
| `etudier-*` | `photo-1531482615713-2afd69097998` |
| `opportunites-*` | `photo-1473625247510-8ceb1760943f` |
| `turquie-*` | `photo-1524231757912-21f4fe3a7200` |
| `chine-*` | `photo-1545893835-abaa50cbe628` |
| `tcf-*` | `photo-1541178735493-479c1a27ed24` |
| `ciel-*`, `ciel-mobile-*` | `photo-1436491865332-7a61a109cc05` |
| `istanbul-bosphore-*` | `photo-1589561454226-796a8aa89b05` |
| `mosquee-bleue-*` | `photo-1541432901042-2d8bd64b4a9b` |
| `grande-muraille-*` | `photo-1508804185872-d7badad00f7d` |
| `cite-interdite-*` | `photo-1547981609-4b6bfe67ca0b` |
| `turquie-arche-*` | `photo-1524231757912-21f4fe3a7200` (recadrage portrait) |

Pour remplacer une photo (Pillow requis : `pip install pillow`) :

```
python3 outils/optimiser_photos.py nouvelle-photo.jpg hero --ratio 4:5 --focus 0.55,0.4 --largeurs 640,960,1280
python3 outils/optimiser_photos.py nouvelle-photo.jpg hero-mobile --ratio 2:3 --largeurs 480,720,1080
python3 outils/optimiser_photos.py nouvelle-photo.jpg voyager --ratio 4:5 --largeurs 400,640,880
```

## À configurer

Dans `assets/js/main.js`, en haut du fichier (`HM_CONFIG`) :

- `whatsappNumber` : numéro WhatsApp Business au format international, sans `+` ni espaces
  (ex. `237698994839`). Tant qu'il est vide, les boutons ouvrent WhatsApp sans destinataire.
- `social.facebook`, `social.instagram`, `social.tiktok` : adresses des pages. Un lien laissé
  vide est masqué sur le site. Facebook, Instagram (@horizon_monde) et TikTok
  (@horizon_monde) sont renseignés. Des emplacements `threads` et `youtube` sont prévus :
  il suffit d'y mettre l'adresse du compte pour qu'il apparaisse (section Réseaux et pied de page).

Tous les boutons WhatsApp ouvrent une conversation avec un message déjà rédigé
(attribut `data-message` dans le HTML).

## Mise en ligne (GitHub Pages)

Settings → Pages → *Deploy from a branch* → choisir la branche puis le dossier `/ (root)`.

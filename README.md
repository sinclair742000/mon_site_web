# mon_site_web — Horizon Monde

Site d'**Horizon Monde**, plateforme d'opportunités internationales : voyages, études et
mobilité internationale. Horizon Monde informe, oriente et accompagne, puis met en relation
avec ses partenaires (dont une agence de voyage partenaire pour la Turquie).

Site statique (HTML, CSS et JavaScript, sans outil de compilation) : il suffit d'ouvrir
`index.html` dans un navigateur.

## Avancement (une étape à la fois)

| Étape | Contenu | État |
|-------|---------|------|
| Accueil — en-tête + hero + « Quel horizon envisagez-vous ? » | `index.html` | ✅ À valider |
| Accueil — sections suivantes (Turquie, parcours, transparence, réseaux, pied de page) | `index.html` | Version 1, à reprendre après validation du hero |
| Pages du menu : Destinations, Opportunités, Services, Comment ça marche, À propos, Contact | à créer | À faire |

Le menu renvoie déjà vers les pages prévues ; les liens fonctionneront au fur et à mesure.
Le pied de page reprend encore l'ancien plan du site : il sera aligné sur le nouveau menu
lors de la reprise des sections suivantes.

## Structure

```
index.html                Page d'accueil
assets/css/style.css      Styles communs à toutes les pages
assets/js/main.js         Script commun (liens WhatsApp, menu mobile, animations)
assets/img/               Logo, emblème, favicon, image de partage
assets/img/photos/        Photos optimisées (AVIF, WebP, JPG en plusieurs largeurs)
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

Pour remplacer une photo (Pillow requis : `pip install pillow`) :

```
python3 outils/optimiser_photos.py nouvelle-photo.jpg hero --ratio 4:5 --focus 0.55,0.4 --largeurs 640,960,1280
python3 outils/optimiser_photos.py nouvelle-photo.jpg hero-mobile --ratio 2:3 --largeurs 480,720,1080
python3 outils/optimiser_photos.py nouvelle-photo.jpg voyager --ratio 4:5 --largeurs 400,640,880
```

## À configurer

Dans `assets/js/main.js`, en haut du fichier (`HM_CONFIG`) :

- `whatsappNumber` : numéro WhatsApp Business au format international, sans `+` ni espaces
  (ex. `2376XXXXXXXX`). Tant qu'il est vide, les boutons ouvrent WhatsApp sans destinataire.
- `social.facebook`, `social.instagram`, `social.tiktok` : adresses des pages. Un lien laissé
  vide est masqué sur le site.

Tous les boutons WhatsApp ouvrent une conversation avec un message déjà rédigé
(attribut `data-message` dans le HTML).

## Mise en ligne (GitHub Pages)

Settings → Pages → *Deploy from a branch* → choisir la branche puis le dossier `/ (root)`.

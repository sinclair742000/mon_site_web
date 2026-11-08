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
| Nouvelle direction « Éditorial immersif » (bleu nuit, ivoire, pierre, accent ambre, titres Playfair Display) + logos officiels des réseaux | accueil + Destinations | ✅ Validé |
| Page Destinations (Turquie à la une, Chine, renvoi TCF) | `destinations.html` | ✅ Validé |
| Page Opportunités (pour qui ?, études, voyages, affaires, mobilité) — catégories mises en avant | `opportunites.html` | ✅ Validé |
| Transitions « horizon » (fondu crépuscule) entre sections sombres et claires | toutes les pages | ✅ Validé |
| Page Services (services, TCF, engagements, questions fréquentes) | `services.html` | ✅ Validé |
| Page Comment ça marche (parcours détaillé, qui fait quoi, à préparer) | `comment-ca-marche.html` | ✅ Validé |
| Photos : personnes noires ; groupes mixtes pour les échanges internationaux | toutes les pages | ✅ Validé |
| Page À propos (mission, valeurs, ancrage à Yaoundé, partenaires) | `a-propos.html` | ✅ À valider |
| Page Contact | à créer | À faire |

Le menu renvoie déjà vers les pages prévues ; les liens fonctionneront au fur et à mesure.

## Structure

```
index.html                Page d'accueil
destinations.html         Page Destinations (Turquie, Chine, renvoi vers le TCF)
opportunites.html         Page Opportunités (études, voyages, affaires, mobilité)
services.html             Page Services (services, TCF, engagements, questions fréquentes)
comment-ca-marche.html    Page Comment ça marche (étapes, qui fait quoi, à préparer)
a-propos.html             Page À propos (mission, valeurs, Yaoundé, partenaires)
assets/css/style.css      Styles communs à toutes les pages
assets/js/main.js         Script commun (liens WhatsApp, menu mobile, animations)
assets/img/               Logo, emblème, favicon, image de partage
assets/img/photos/        Photos optimisées (AVIF, WebP, JPG en plusieurs largeurs)
assets/img/globe.svg      Globe filaire : routes depuis Yaoundé (Istanbul, Paris, Shanghai, Montréal)
outils/optimiser_photos.py  Script de préparation des photos
```

## Photos

Principe : les personnes photographiées sont des personnes noires (hommes, femmes, garçons,
filles) ; là où le site montre les échanges avec des interlocuteurs étrangers (affaires,
études à l'international), des personnes de différentes origines apparaissent ensemble.

Photos provisoires issues d'Unsplash et de Pexels (licences gratuites, usage commercial
permis, attribution non obligatoire). Pour une communication publicitaire, une séance photo
dédiée ou des photos sous licence avec autorisation des modèles reste recommandée.

| Fichier | Source |
|---------|--------|
| `hero-*`, `hero-mobile-*` | Unsplash `photo-1589156280159-27698a70f29e` |
| `etudier-*` | Unsplash `photo-1531482615713-2afd69097998` |
| `tcf-*`, `tcf-portrait-*` | Unsplash `photo-1541178735493-479c1a27ed24` |
| `conseillere-*` | Unsplash `photo-1611432579699-484f7990b127` |
| `voyager-*` (père et enfants, valise) | Pexels 4546012 |
| `cappadoce-*`, `cappadoce-mini-*` (montgolfières) | Pexels 19228322 |
| `porte-large-*`, `porte-mobile-*` (montgolfières au coucher du soleil, appel final) | Pexels 5700576 |
| `opportunites-*` (jeune homme, téléphone et ordinateur) | Pexels 4173204 |
| `attente-*` (jeune femme entre ses valises) | Pexels 4173237 |
| `departs-*` (jeune homme, valise et passeport) | Pexels 4173219 |
| `boussole-*` (mains sur une carte) | Pexels 12585887 |
| `affaires-*` (poignée de main, partenaires internationaux) | Pexels 5668465 |
| `etudes-groupe-*` (étudiants d'origines différentes) | Pexels 6146978 |
| `yaounde-large-*`, `yaounde-mobile-*` (panorama de Yaoundé) | Pexels 17290955 |
| `yaounde-ville-*` (rond-point « I love my country Cameroon ») | Pexels 17290974 |
| `mission-*` (jeune femme au téléphone) | Pexels 4173233 |
| `partenaires-*` (jeune femme et collègue, groupe mixte) | Pexels 3860937 |
| `turquie-*`, `turquie-large-*`, `turquie-arche-*` | Unsplash `photo-1524231757912-21f4fe3a7200` |
| `istanbul-bosphore-*` | Unsplash `photo-1589561454226-796a8aa89b05` |
| `mosquee-bleue-*` | Unsplash `photo-1541432901042-2d8bd64b4a9b` |
| `chine-*` | Unsplash `photo-1545893835-abaa50cbe628` |
| `grande-muraille-*` | Unsplash `photo-1508804185872-d7badad00f7d` |
| `cite-interdite-*` | Unsplash `photo-1547981609-4b6bfe67ca0b` |
| `ciel-*` | Unsplash `photo-1436491865332-7a61a109cc05` |
| `tarmac-*` | Unsplash `photo-1542296332-2e4473faf563` |

Liens Pexels : `https://www.pexels.com/photo/<numéro>/`.

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

Les logos des réseaux sociaux (WhatsApp, Facebook, Instagram, TikTok, Threads, YouTube) sont les
tracés officiels de [Simple Icons](https://simpleicons.org) (licence CC0), affichés dans les couleurs
d'origine de chaque marque : WhatsApp #25D366, Facebook #0866FF, dégradé Instagram, TikTok noir
avec ses reflets cyan et rose, YouTube #FF0000.

## Mise en ligne (GitHub Pages)

Settings → Pages → *Deploy from a branch* → choisir la branche puis le dossier `/ (root)`.

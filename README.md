# mon_site_web — Horizon Monde

Site vitrine d'**Horizon Monde** : voyages, études et opportunités en Turquie.
Horizon Monde informe, rassure et qualifie les prospects, puis les met en relation
avec l'agence de voyage partenaire.

Site statique (HTML, CSS et JavaScript, sans outil de compilation) : il suffit d'ouvrir
`index.html` dans un navigateur.

## Avancement (une page à la fois)

| # | Page | Fichier | État |
|---|------|---------|------|
| 1 | Accueil | `index.html` | ✅ À valider |
| 2 | Voyages & séjours | `voyages.html` | À faire |
| 3 | Études en Turquie | `etudes.html` | À faire |
| 4 | Comment ça marche | `comment-ca-marche.html` | À faire |
| 5 | FAQ | `faq.html` | À faire |
| 6 | Contact / évaluer mon projet | `contact.html` | À faire |

Le menu renvoie déjà vers les six pages ; les liens vers les pages pas encore créées
fonctionneront au fur et à mesure.

## Structure

```
index.html              Page d'accueil
assets/css/style.css    Styles communs à toutes les pages
assets/js/main.js       Script commun (liens WhatsApp, menu mobile, animations)
assets/img/             Logo, emblème, favicon, illustration d'Istanbul, image de partage
```

## À configurer

Dans `assets/js/main.js`, en haut du fichier (`HM_CONFIG`) :

- `whatsappNumber` : numéro WhatsApp Business au format international, sans `+` ni espaces
  (ex. `905321234567`). Tant qu'il est vide, les boutons ouvrent WhatsApp sans destinataire.
- `social.facebook`, `social.instagram`, `social.tiktok` : adresses des pages. Un lien laissé
  vide est masqué sur le site.

Tous les boutons WhatsApp ouvrent une conversation avec un message déjà rédigé
(attribut `data-message` dans le HTML).

## Mise en ligne (GitHub Pages)

Settings → Pages → *Deploy from a branch* → choisir la branche puis le dossier `/ (root)`.

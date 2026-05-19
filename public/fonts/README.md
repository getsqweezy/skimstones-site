# Polices du site SkimStones / SQWEEZY

Placez les fichiers de polices dans ce dossier.
Format requis : **WOFF2** (.woff2) — meilleure compression pour le web.
Si vous avez des fichiers .ttf ou .otf, convertissez-les sur https://www.fontsquirrel.com/tools/webfont-generator

## Polices communes aux deux chartes

| Fichier attendu            | Police          | Usage                    | Poids |
|----------------------------|-----------------|--------------------------|-------|
| `gadugi.woff2`             | Gadugi          | Texte normal (body)      | 400   |
| `gadugi-bold.woff2`        | Gadugi Bold     | Texte normal gras        | 700   |

## Charte SKS uniquement

| Fichier attendu                    | Police                   | Usage            | Poids    |
|------------------------------------|--------------------------|------------------|----------|
| `argentum-sans-vf.woff2`           | Argentum Sans VF         | Titres, niveau 1 | 100–900  |
| `artifakt-element-medium.woff2`    | Artifakt Element Medium  | Labels, niveau 2 | 500      |

## Charte SQW uniquement

| Fichier attendu    | Police     | Usage         | Poids |
|--------------------|------------|---------------|-------|
| `stylus-bt.woff2`  | Stylus BT  | Texte spécial | 400   |

## Comment obtenir ces polices

- **Gadugi** : police Microsoft. Présente sur Windows dans C:\Windows\Fonts\.
  Convertissez gadugi.ttf et gadugib.ttf en woff2.
- **Argentum Sans VF** : cherchez sur https://fonts.google.com (tapez "Argentum Sans")
- **Artifakt Element** : police Autodesk — https://fonts.autodesk.com
- **Stylus BT** : police Bitstream/Monotype — nécessite une licence commerciale

## En attendant les fichiers

Le site fonctionne avec les polices de substitution définies dans globals.css.
L'apparence sera correcte mais pas conforme à la charte exacte.

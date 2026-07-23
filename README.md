# Fernhout & Fernhout - website

## Structuur

```
index.html              catalogus pagina
css/style.css           styling
js/products.js          productdata (namen, prijzen, foto-paden)
js/app.js                rendert de catalogus + licht aan/uit toggle + bestel-knop
images/products/<slug>/  drie foto's per product (printvel, licht-uit, licht-aan)
api/create-payment.js    Vercel serverless functie: start een Mollie betaling
api/webhook.js           Vercel serverless functie: verwerkt de Mollie betaalstatus
```

## Foto's vervangen (later, als de fotografie klaar is)

1. Zet de drie echte foto's van een product in `images/products/<slug>/`
   Bijvoorbeeld: `images/products/ring-blad/printvel.jpg`
2. Open `js/products.js` en pas het pad aan naar de nieuwe bestandsnaam
   (bijvoorbeeld van `printvel.svg` naar `printvel.jpg`)
3. Verwijder de oude placeholder svg als die niet meer nodig is

De rest van de site (styling, toggle, bestel-knop) hoeft niet aangepast te worden.

## Nieuw product toevoegen

1. Maak een map `images/products/<nieuwe-slug>/` met de drie foto's (of placeholders)
2. Kopieer een productblok in `js/products.js` en pas slug, naam, beschrijving,
   prijs en image-paden aan

## Lokaal bekijken

Dit is een statische site, geen build-stap nodig. Open `index.html` direct in de
browser, of run bijvoorbeeld `npx serve .` in deze map voor een lokale server.

## Deployen naar Vercel

1. Zet dit project in een GitHub repository
2. Importeer die repository in Vercel (vercel.com -> Add New Project)
3. Voeg in Vercel -> Settings -> Environment Variables de key `MOLLIE_API_KEY` toe
   (eerst de test key uit het Mollie dashboard, later de live key)
4. Koppel het domein fernhout-fernhout.com bij Vercel -> Settings -> Domains,
   en zet de DNS-records die Vercel toont bij TransIP

## Bestelflow (MVP)

- Klant klikt "Bestellen" op een product
- `api/create-payment.js` maakt een betaling aan bij Mollie en stuurt de klant
  naar de Mollie hosted checkout
- Na betalen stuurt Mollie een notificatie naar `api/webhook.js`
- Op dit moment wordt de status alleen gelogd (`console.log`), zie de TODO in
  dat bestand om orders echt op te slaan (bijvoorbeeld Supabase of een Google Sheet)

## Site tijdelijk afschermen (wachtwoord-slot)

Zolang de site nog verzonnen productnamen en placeholder-prijzen heeft, staat er
een wachtwoord-slot op de hele site via `middleware.js`. Dit is standaard AAN
zodra je `SITE_PASS` instelt:

1. Ga in Vercel naar Settings -> Environment Variables
2. Voeg toe: `SITE_USER` (bijvoorbeeld `fernhout`) en `SITE_PASS` (een wachtwoord naar keuze)
3. Klik op Redeploy

Zolang `SITE_PASS` niet is ingesteld, is de site gewoon toegankelijk (zodat je
jezelf niet per ongeluk buitensluit). Zodra je de site echt live wil zetten:
verwijder de `SITE_PASS` variabele in Vercel (of verwijder `middleware.js` uit
de repository) en deploy opnieuw.

Zoekmachines wordt sowieso gevraagd de site niet te indexeren via `robots.txt`
en een noindex-tag, ongeacht het wachtwoord.

## Nog te doen

- Echte productfoto's (printvel + licht uit + licht aan, per product)
- Echte prijzen in `js/products.js` (nu overal € 0,00)
- Mollie test API key aansluiten in Vercel, betaalflow testen
- Algemene voorwaarden, herroepingsrecht, privacybeleid toevoegen
- Order-opslag koppelen in `api/webhook.js`

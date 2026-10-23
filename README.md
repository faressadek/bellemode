# Belle Mode

A simple online clothing store that works as an installable app (a Progressive Web App). No build step and no dependencies.

## Install as an app

The app must be served over HTTPS (for example with GitHub Pages) or from `localhost`.

- **Android / Chrome / Edge:** tap the "Install app" button in the header, or use the browser menu's "Install app" option.
- **iPhone / iPad (Safari):** tap Share, then "Add to Home Screen".

Once installed it opens full screen and works offline.

## Features

- Product grid with category filters (All, Dresses, Tops, Bottoms, Outerwear)
- Shopping cart with quantity controls and a running total (saved in the browser)
- Responsive layout for phone, tablet and desktop

## Project structure

```
index.html      Page markup
styles.css      Styling
products.js     Product catalogue (edit this to change what is for sale)
app.js          Filtering, cart logic and install button
manifest.webmanifest   App name, colors and icons
sw.js           Service worker (offline caching)
icons/          App icons
```

When you change any cached file, bump the `CACHE` version in `sw.js` so installed copies update.

## Running locally

Serve the folder (the service worker needs `localhost` or HTTPS, so opening the file directly won't install):

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Editing products

Each product in `products.js` has an `id`, `name`, `category`, `price` and `color`. Add or remove entries to change the catalogue. The `color` value is used as a placeholder image background until you add real photos.

## Next steps

- Replace the placeholder colors with product photos
- Add a checkout flow (Stripe, Shopify Buy Button or similar)
- Turn on GitHub Pages (Settings → Pages) to get an HTTPS link people can install from

# Belle Mode

A simple, static online clothing store. No build step and no dependencies: open `index.html` in a browser and it works.

## Features

- Product grid with category filters (All, Dresses, Tops, Bottoms, Outerwear)
- Shopping cart with quantity controls and a running total (saved in the browser)
- Responsive layout for phone, tablet and desktop

## Project structure

```
index.html      Page markup
styles.css      Styling
products.js     Product catalogue (edit this to change what is for sale)
app.js          Filtering and cart logic
```

## Running locally

Open `index.html` directly, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Editing products

Each product in `products.js` has an `id`, `name`, `category`, `price` and `color`. Add or remove entries to change the catalogue. The `color` value is used as a placeholder image background until you add real photos.

## Next steps

- Replace the placeholder colors with product photos
- Add a checkout flow (Stripe, Shopify Buy Button or similar)
- Deploy with GitHub Pages

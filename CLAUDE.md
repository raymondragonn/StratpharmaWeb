# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands
```bash
npm start          # Dev server at http://localhost:4200/ with hot reload
npm run build      # Development build
npm run build:prod # Production build (outputs to dist/)
npm test           # Run unit tests via Karma/Jasmine
ng generate component components/pages/landing/<name>/<name>  # Scaffold new component
```

## Architecture

This is an **Angular 17 standalone-component** app (no NgModules) for **Stratpharma Iberia** — a pharmaceutical landing site in Spanish.

### Routing

Two routes only (`src/app/app.routes.ts`):
- `/` → `LandingComponent` — single-page landing with section-based scroll navigation
- `/product/:id` → `AboutComponent` — product detail page (IDs 1–5)

### Component tree

```
AppComponent           (navbar + router-outlet + footer, loads main.js via jQuery on route change)
├── NavbarComponent
├── LandingComponent   (sections rendered in order)
│   ├── BannerComponent
│   ├── FeaturesComponent
│   ├── ProductsComponent   (product cards, links to /product/:id)
│   ├── HowToBuyComponent   (step list + inline video + modal video)
│   └── ContactComponent    (contact info + Google Maps embed)
├── AboutComponent     (product detail with image gallery and auto-rotation)
└── FooterComponent
```

All components are standalone and import only what they need.

### Product data

Product content is **hardcoded in TypeScript**, not fetched from an API:
- `ProductsComponent` holds the `products[]` array (card data)
- `AboutComponent` holds `productsMap` keyed by string ID (`'1'`–`'5'`), with full detail, thumbnails, shop URLs, and paragraph content

To add or update a product, edit both files.

### Navigation / scroll

- In-page anchor navigation uses `#sectionId` fragments. `AppComponent.recallJsFuntions()` intercepts router events and calls `scrollIntoView` for fragment links.
- `LandingComponent.ngAfterViewInit` scrolls to a hash on initial load.
- `HowToBuyComponent.goToProducts()` scrolls to `#products` and falls back to router navigation.

### Third-party JS

`src/assets/js/main.js` is loaded dynamically via jQuery (`$.getScript`) on every route change. This file initialises third-party UI plugins (WOW.js, Owl Carousel, etc.). It reloads only when the path changes (not on same-path fragment changes).

### Styles

Bootstrap 5, Animate.css, custom SCSS per component. Line Awesome icons via `src/assets/css/line-awesome.min.css`.

### Images / assets

Product images live under `src/assets/img/products/<product-name>/`. New product images must go there and be referenced by exact path string in `AboutComponent.productsMap` and `ProductsComponent.products`.

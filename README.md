# Más Mus · landing

Static site for Más Mus at `masmus.larri.dev`: the landing page (`/`), the privacy policy (`/privacy/`) and the terms of use (`/terms/`), in Spanish.

Vite and Tailwind CSS v4, deployed to Cloudflare Workers as static assets (`wrangler.toml`, `dist/`). No forms, no analytics and no external requests: fonts are self-hosted.

```bash
just install     # pnpm install
just dev         # local development
just build       # build to dist/
just preview     # build and serve dist/
just og-image    # render public/og-image.jpg from tool/og-image.html (needs Chrome; pass another browser path as argument)
just screenshots # with preview running: every page at 390 and 1280 px, mid-scroll frames and reduced motion, into .screenshots/
just lighthouse  # with preview running: Lighthouse on mobile and desktop, into .screenshots/lighthouse/
just deploy      # build and npx wrangler deploy
```

## Assets from the app

Taken from `clarriu97/masmus`; regenerate them there and copy them again when the app changes.

- Colors: the Tapete tokens of `lib/ui/theme/app_colors.dart`, in `src/styles/main.css`.
- Fonts: Young Serif and Alegreya Sans from `assets/fonts/`, subset to Latin and converted to WOFF2 (`public/fonts/`, with their OFL licenses).
- Icons: `assets/branding/app_icon.png` (`public/favicon-48.png`, `public/apple-touch-icon.png`, `public/icon.webp`, `tool/og-icon.png`).
- Screens: the iPhone Pro goldens of `test/goldens/goldens/` as WebP (`public/screens/`).
- Faces: the first column of `test/goldens/goldens/faces.png` (`public/faces/`).

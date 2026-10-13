# Cressida (Next.js)

Live website: "https://cressida-next.vercel.app/"


Static marketing site for Cressida — AI-driven creative agency.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> Dev uses Webpack (`next dev --webpack`) because Turbopack panics on this project path.

## Production build (static export)

```bash
npm run build
npm start
```

`npm start` serves the `out/` folder (static export). Do not use `next start` with this project.

## Notes

- Design assets and page look are preserved from the original site.
- Project inquiry form saves to `localStorage` and redirects to `/thank-you/` (static hosting has no API). Set a form `action` URL later if you add Formspree / Apps Script.
- Contact email: `contact@cressida.studio`

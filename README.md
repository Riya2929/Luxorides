# Luxorides — Vehicle Showcase & Booking Preview

A mini luxury car showcase and booking-preview flow, built with the Next.js
App Router and plain JavaScript (no TypeScript, per request).

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. The root page is a small landing hero;
the assessment's page lives at **/vehicles**.

There's nothing to configure — the "API" is mocked in-process, so no
environment variables or database are required.

## Architecture

**Server vs. Client split**

- `app/vehicles/page.js` is a **Server Component**. It calls `getVehicles()`
  directly (an async function in `lib/data.js` that simulates a network
  delay) and renders the page shell. Nothing here needs interactivity, so
  none of it ships to the client as JS.
- `components/VehiclesExplorer.js` is the **Client Component boundary**
  (`"use client"`). It owns the search text, category filter, and which
  car is currently selected for booking — all of that is local UI state
  that has to run in the browser. The fetched vehicle array is passed in
  as a prop from the server component, so there's exactly one fetch per
  page load, not a client-side re-fetch on top of the server render.
- `components/VehicleCard.js` and `components/BookingModal.js` are also
  client components — one holds local image-fallback state, the other
  holds the booking form state (dates, submit status). Both are only ever
  rendered from inside `VehiclesExplorer`, so they're already part of the
  client bundle either way; the directive is kept on them for clarity.

**Data layer**

`lib/data.js` exports the mock fleet array and a single `getVehicles()`
accessor. Both the Route Handler (`app/api/vehicles/route.js`) and the
server page import from this same module, so there's one source of truth
if the mock data is swapped for a real service later. The Route Handler
supports `?category=` and `?q=` query params and returns
`{ vehicles: [...] }` — useful if a future client wanted to filter
server-side instead of (or in addition to) the current client-side
filtering.

**Filtering**

Search and category filtering both run client-side via a memoized
`filtered` array in `VehiclesExplorer` — no network round-trip, no page
refresh, per the spec.

**Booking drawer**

Clicking "Reserve Now" sets `selectedCar` in `VehiclesExplorer`, which
mounts `BookingModal` as a right-side slide-over. Total price is derived
state: `days = returnDate − pickupDate` (minimum 1 day once a valid
range is picked) `× pricePerDay`, recomputed on every keystroke/date
change via `useMemo`. Submitting simulates a network call with a short
`setTimeout`, then swaps the form for a success state inside the same
panel (no separate toast library needed).

## Design notes

The visual direction (obsidian background, antique-gold hairlines, a
serif/grotesk/mono type pairing) is meant to read as a private-fleet
service rather than a generic SaaS dashboard. The one deliberate
"signature" touch is the price display: it uses tabular-numeral
monospace digits (`.meter`), nodding to a trip meter, since this is a
by-the-day rental price.

## Trade-offs made for the time constraint

- No automated tests — for a 3-hour scope, manual verification of the
  filter/modal/price-calculation logic was prioritized over test
  scaffolding.
- No real backend/persistence — reservations are simulated in memory
  and don't survive a refresh, per the spec's "simulated success state."
- Unsplash image URLs are used directly (with an `onError` fallback to a
  text placeholder) rather than downloading and self-hosting assets, to
  keep the repo small.
- No pagination — the fleet is small enough (6 cars) that the whole set
  renders at once; a larger catalog would want server-side pagination
  through the existing Route Handler.
- Category list is a fixed constant (`All / Sedan / SUV / Supercar`)
  rather than derived from the data, since the spec named these
  categories explicitly.

## (Optional) Deploying to Vercel

```bash
npm i -g vercel
vercel
```

No environment variables are needed since the data layer is mocked
in-process.

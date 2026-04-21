# Timeglass — Development Plan

## Current State

The frontend is complete and functional:
- Interactive Leaflet world map with 12 clickable regions
- Vertical era timeline with 5 eras per region
- Curated video + book resources per region/era
- Country-specific data overrides (countries.json) with region fallback (regions.json)
- Resource links mostly pinned to direct URLs (YouTube video IDs, Open Library work IDs)
- Dockerized: nginx serving a Vite build

## Next Up: Backend

### Step 1 — Docker Compose: add `db` and `api` services

Add `db` (postgres:16-alpine) and `api` (FastAPI/uvicorn) services to Docker Compose alongside the existing `frontend` service. Wire up `DATABASE_URL` on the api container and `VITE_API_URL` on the frontend build.

### Step 2 — Database models + initial migration

Define SQLAlchemy ORM models and run the first Alembic migration to create the schema.

**Tables:**
- `regions` — id (text), name, center_lat, center_lng
- `countries` — id (integer, ISO numeric), name, region_id FK
- `eras` — id (text), label, display, sort_order
- `region_eras` — region_id FK, era_id FK (join table)
- `country_eras` — country_id FK, era_id FK (join table)
- `resources` — id, title, creator, url, type (video|book), scope (region|country), scope_id, era_id FK

### Step 3 — Seed script

One-time script (`backend/scripts/seed.py`) that reads the existing `src/data/regions.json` and `src/data/countries.json` and populates the database. Preserves all current content.

### Step 4 — API endpoints

```
GET  /regions
GET  /regions/{region_id}
GET  /regions/{region_id}/eras/{era_id}
GET  /countries/{country_id}
GET  /countries/{country_id}/eras/{era_id}
GET  /eras
```

### Step 5 — Frontend: switch to API fetching

Replace static JSON imports in `TimelinePanel.jsx` and `ContentPanel.jsx` with fetch calls. Add loading and error states. `regionMapping.js` and `countryNames.js` stay bundled (needed synchronously for map rendering).

### Step 6 — User accounts

Extend the schema with a `users` table. Add auth middleware (JWT or session-based). Required before bookmarks can be built.

## Backlog

- User bookmarks (save region/era combinations)
- Search/filter across regions and eras by topic
- Expand resources per era to 4–6 items (add podcasts, primary sources)
- Historical connections feature: surface links between regions in the same era

## Architecture Notes

- `regionMapping.js` and `countryNames.js` stay on the frontend — they are lookup tables for Leaflet map rendering and are needed before any API call is made
- The `scope` + `scope_id` pattern on the `resources` table mirrors the current JSON structure (country-specific resources override region resources at the same era)
- Natural git commit points: after each numbered step above

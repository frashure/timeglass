# Timeglass

An interactive world history learning application. Explore the history of any region on earth by clicking it on the map, selecting an era on the timeline, and browsing curated videos and books for that place and period.

## Features

- Interactive world map with clickable regions
- Era timeline spanning Ancient (3000 BCE) through Contemporary (present)
- Curated video and book recommendations per region and era
- Country-specific content for 18 countries, with regional fallback for all others
- Dark-themed, responsive UI
- Escape key closes the sidebar

## Regions Covered

- Western Europe
- East Asia
- Middle East & North Africa
- Sub-Saharan Africa
- South Asia
- Russia
- Eastern Europe
- Central Asia
- Southeast Asia
- Oceania
- North America
- Latin America

## Tech Stack

**Frontend**
- [React](https://react.dev/) + [Vite](https://vite.dev/)
- [React-Leaflet](https://react-leaflet.js.org/) — interactive map
- OpenStreetMap tiles

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) + [uvicorn](https://www.uvicorn.org/)
- [PostgreSQL 16](https://www.postgresql.org/) — primary database
- [SQLAlchemy](https://www.sqlalchemy.org/) — ORM
- [Alembic](https://alembic.sqlalchemy.org/) — database migrations

**Infrastructure**
- [Docker](https://www.docker.com/) + Docker Compose — three services: `db`, `api`, `frontend`
- nginx — serves the Vite production build

## Getting Started

### With Docker (recommended)

```bash
docker compose up --build -d
docker compose exec api python scripts/seed.py
```

- Frontend: `http://localhost:8080`
- API: `http://localhost:8000`
- Interactive API docs: `http://localhost:8000/docs`

### Frontend only (local dev)

Requires the API running separately at `http://localhost:8000`.

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## API Endpoints

```
GET  /regions
GET  /regions/{region_id}
GET  /regions/{region_id}/eras/{era_id}
GET  /countries/{country_id}
GET  /countries/{country_id}/eras/{era_id}
GET  /eras
```

## Project Structure

```
├── backend/
│   ├── app/
│   │   ├── main.py          # FastAPI app, CORS, router registration
│   │   ├── config.py        # Settings (DATABASE_URL, CORS_ORIGINS)
│   │   ├── database.py      # SQLAlchemy engine and session
│   │   ├── models.py        # ORM models
│   │   ├── schemas.py       # Pydantic response models
│   │   └── routers/
│   │       ├── regions.py
│   │       ├── countries.py
│   │       └── eras.py
│   ├── alembic/             # Database migrations
│   ├── scripts/
│   │   └── seed.py          # One-time data import from src/data/
│   ├── Dockerfile
│   └── requirements.txt
├── src/
│   ├── components/
│   │   ├── WorldMap.jsx       # Leaflet map with clickable country overlays
│   │   ├── TimelinePanel.jsx  # Era selector
│   │   └── ContentPanel.jsx   # Resource cards (videos + books)
│   ├── data/
│   │   ├── regions.json       # Source data (seeded into DB; not used at runtime)
│   │   ├── countries.json     # Source data (seeded into DB; not used at runtime)
│   │   ├── regionMapping.js   # ISO numeric country code → region ID (bundled)
│   │   └── countryNames.js    # ISO numeric country code → display name (bundled)
│   ├── hooks/
│   │   └── useCountryOrRegion.js  # Fetch hook: tries country, falls back to region
│   ├── App.jsx
│   └── App.css
├── docker-compose.yaml
├── Dockerfile               # Frontend (nginx)
└── nginx.conf
```

## Known Limitations

- Some resource links still use search-based URLs (YouTube search / Open Library search) where direct links could not be verified.
- Region boundaries on the map are approximate bounding boxes, not precise geographic borders.

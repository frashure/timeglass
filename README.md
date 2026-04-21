# Timeglass

An interactive world history learning application. Explore the history of any region on earth by clicking it on the map, selecting an era on the timeline, and browsing curated videos and books for that place and period.

## Features

- Interactive world map with clickable regions
- Era timeline spanning Ancient (3000 BCE) through Contemporary (present)
- Curated video and book recommendations per region and era
- Dark-themed, responsive UI

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

**Backend** _(planned)_
- Python + FastAPI
- PostgreSQL

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

## Project Structure

```
src/
├── components/
│   ├── WorldMap.jsx       # Leaflet map with clickable country/region overlays
│   ├── TimelinePanel.jsx  # Era selector
│   └── ContentPanel.jsx   # Resource cards (videos + books)
├── data/
│   ├── regions.json       # Region-level eras and resources
│   ├── countries.json     # Country-specific eras and resources (overrides region data)
│   ├── regionMapping.js   # ISO numeric country code → region ID
│   └── countryNames.js    # ISO numeric country code → display name
├── App.jsx
└── App.css
```

## Known Limitations

- Some resource links still use search-based URLs (YouTube search / Open Library search) where direct links could not be verified. The majority have been updated to pinned direct links.
- Region boundaries on the map are approximate bounding boxes, not precise geographic borders.
- Content is limited to 12 regions and 5 eras per region. Expanding coverage will be easier once the Python backend and database are in place.

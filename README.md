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
│   ├── WorldMap.jsx       # Leaflet map with clickable region overlays
│   ├── TimelinePanel.jsx  # Era selector
│   └── ContentPanel.jsx   # Resource cards (videos + books)
├── data/
│   └── regions.json       # Static content: regions, eras, and resources
├── App.jsx
└── App.css
```

## Known Limitations

- Resource links currently use search-based URLs (YouTube search / Open Library search) rather than pinned direct links. Direct URL verification is a planned follow-up task.
- Region boundaries on the map are approximate bounding boxes, not precise geographic borders.
- Content is limited to 7 regions and 5 eras. Expanding coverage will be easier once the Python backend and database are in place.

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import * as topojson from 'topojson-client';
import 'leaflet/dist/leaflet.css';
import regionsData from '../data/regions.json';
import REGION_MAPPING from '../data/regionMapping.js';
import COUNTRY_NAMES from '../data/countryNames.js';

const ANTARCTICA_ID = 10;

// Unwrap a coordinate ring so that consecutive vertices never jump more than
// 180° in longitude. This prevents Leaflet from drawing horizontal lines
// across the map for polygons that cross the antimeridian (e.g. Russia).
function unwrapRing(ring) {
  if (ring.length === 0) return ring;
  const result = [ring[0]];
  for (let i = 1; i < ring.length; i++) {
    const prev = result[result.length - 1];
    let lng = ring[i][0];
    while (lng - prev[0] > 180) lng -= 360;
    while (prev[0] - lng > 180) lng += 360;
    result.push([lng, ring[i][1]]);
  }
  return result;
}

function unwrapGeometry(geometry) {
  if (!geometry) return geometry;
  if (geometry.type === 'Polygon') {
    return { ...geometry, coordinates: geometry.coordinates.map(unwrapRing) };
  }
  if (geometry.type === 'MultiPolygon') {
    return {
      ...geometry,
      coordinates: geometry.coordinates.map((poly) => poly.map(unwrapRing)),
    };
  }
  return geometry;
}

function fixAntimeridian(geojson) {
  return {
    ...geojson,
    features: geojson.features
      .filter((f) => f.id !== ANTARCTICA_ID)
      .map((f) => ({ ...f, geometry: unwrapGeometry(f.geometry) })),
  };
}

const COLORS = {
  default: '#c8a96e',
  selected: '#e07b39',
  hover: '#d4944a',
  unclickable: '#4a4f5e',
};

function getRegionId(feature) {
  return REGION_MAPPING[feature.id] ?? null;
}

function styleFeature(feature, selectedCountryId) {
  const regionId = getRegionId(feature);
  if (!regionId) {
    return {
      color: COLORS.unclickable,
      fillColor: COLORS.unclickable,
      fillOpacity: 0.08,
      weight: 0.5,
    };
  }
  const isSelected = feature.id === selectedCountryId;
  return {
    color: isSelected ? COLORS.selected : COLORS.default,
    fillColor: isSelected ? COLORS.selected : COLORS.default,
    fillOpacity: isSelected ? 0.6 : 0.25,
    weight: isSelected ? 2 : 0.8,
  };
}

// Separate component so we can re-key GeoJSON when selection changes
function CountryLayer({ geojson, selectedCountryId, onCountrySelect }) {
  return (
    <GeoJSON
      key={selectedCountryId ?? '__none__'}
      data={geojson}
      style={(feature) => styleFeature(feature, selectedCountryId)}
      onEachFeature={(feature, layer) => {
        const regionId = getRegionId(feature);
        if (!regionId) return;

        const regionName = regionsData.regions[regionId]?.name ?? regionId;
        const countryName = COUNTRY_NAMES[feature.id] ?? feature.properties?.name ?? '';
        layer.bindTooltip(`${countryName} — ${regionName}`, { sticky: true });

        layer.on({
          mouseover(e) {
            const isSelected = feature.id === selectedCountryId;
            e.target.setStyle({
              fillOpacity: isSelected ? 0.7 : 0.42,
              weight: isSelected ? 2 : 1.5,
            });
          },
          mouseout(e) {
            e.target.setStyle(styleFeature(feature, selectedCountryId));
          },
          click() {
            onCountrySelect(feature.id);
          },
        });
      }}
    />
  );
}

export default function WorldMap({ onCountrySelect, selectedCountryId }) {
  const [geojson, setGeojson] = useState(null);

  useEffect(() => {
    import('world-atlas/countries-110m.json').then((module) => {
      const topology = module.default;
      const countries = topojson.feature(topology, topology.objects.countries);
      setGeojson(fixAntimeridian(countries));
    });
  }, []);

  return (
    <MapContainer
      center={[20, 10]}
      zoom={2}
      minZoom={2}
      maxZoom={6}
      style={{ height: '100%', width: '100%' }}
      worldCopyJump={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      {geojson && (
        <CountryLayer
          geojson={geojson}
          selectedCountryId={selectedCountryId}
          onCountrySelect={onCountrySelect}
        />
      )}
    </MapContainer>
  );
}

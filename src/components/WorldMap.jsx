import { MapContainer, TileLayer, Rectangle, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import regionsData from '../data/regions.json';

// Bounding boxes [southLat, westLng, northLat, eastLng] for each region
const REGION_BOUNDS = {
  'western-europe':      [[35, -10], [71,  30]],
  'east-asia':           [[18,  95], [55, 145]],
  'middle-east':         [[15,  -5], [42,  65]],
  'sub-saharan-africa':  [[-35, -20], [15,  55]],
  'south-asia':          [[ 5,  60], [38,  90]],
  'north-america':       [[15, -170], [75, -50]],
  'latin-america':       [[-56, -82], [15, -34]],
};

const REGION_COLOR = '#c8a96e';
const REGION_HOVER_COLOR = '#e07b39';

export default function WorldMap({ onRegionSelect, selectedRegion }) {
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
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {Object.entries(REGION_BOUNDS).map(([regionId, bounds]) => {
        const region = regionsData.regions[regionId];
        const isSelected = selectedRegion === regionId;

        return (
          <Rectangle
            key={regionId}
            bounds={bounds}
            pathOptions={{
              color: isSelected ? REGION_HOVER_COLOR : REGION_COLOR,
              fillColor: isSelected ? REGION_HOVER_COLOR : REGION_COLOR,
              fillOpacity: isSelected ? 0.5 : 0.25,
              weight: isSelected ? 2 : 1,
            }}
            eventHandlers={{
              click: () => onRegionSelect(regionId),
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.45, weight: 2 });
              },
              mouseout: (e) => {
                e.target.setStyle({
                  fillOpacity: isSelected ? 0.5 : 0.25,
                  weight: isSelected ? 2 : 1,
                });
              },
            }}
          >
            <Tooltip sticky>{region.name}</Tooltip>
          </Rectangle>
        );
      })}
    </MapContainer>
  );
}

import countriesData from '../data/countries.json';
import regionsData from '../data/regions.json';
import COUNTRY_NAMES from '../data/countryNames.js';

function resolveData(countryId, regionId) {
  const country = countriesData[countryId];
  if (country) {
    return { name: country.name, eras: country.eras, isCountrySpecific: true };
  }
  const region = regionsData.regions[regionId];
  if (region) {
    const countryName = COUNTRY_NAMES[countryId] ?? region.name;
    return { name: countryName, eras: region.eras, isCountrySpecific: false };
  }
  return null;
}

export default function TimelinePanel({ countryId, regionId, selectedEra, onEraSelect }) {
  const data = resolveData(countryId, regionId);
  if (!data) return null;

  return (
    <div className="timeline-panel">
      <h2 className="timeline-region-name">{data.name}</h2>
      {!data.isCountrySpecific && (
        <p className="timeline-fallback-note">Showing regional resources</p>
      )}
      <p className="timeline-prompt">Select an era to explore</p>

      <div className="timeline-track">
        {data.eras.map((era, index) => {
          const isSelected = selectedEra === era.id;
          return (
            <button
              key={era.id}
              className={`era-marker ${isSelected ? 'era-marker--selected' : ''}`}
              onClick={() => onEraSelect(era.id)}
              style={{ '--era-index': index, '--era-count': data.eras.length }}
            >
              <span className="era-label">{era.label}</span>
              <span className="era-range">{era.display}</span>
            </button>
          );
        })}
        <div className="timeline-line" />
      </div>
    </div>
  );
}

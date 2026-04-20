import regionsData from '../data/regions.json';

export default function TimelinePanel({ regionId, selectedEra, onEraSelect }) {
  const region = regionsData.regions[regionId];
  if (!region) return null;

  const eras = region.eras;

  return (
    <div className="timeline-panel">
      <h2 className="timeline-region-name">{region.name}</h2>
      <p className="timeline-prompt">Select an era to explore</p>

      <div className="timeline-track">
        {eras.map((era, index) => {
          const isSelected = selectedEra === era.id;
          return (
            <button
              key={era.id}
              className={`era-marker ${isSelected ? 'era-marker--selected' : ''}`}
              onClick={() => onEraSelect(era.id)}
              style={{ '--era-index': index, '--era-count': eras.length }}
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

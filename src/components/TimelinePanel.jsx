import { useCountryOrRegion } from '../hooks/useCountryOrRegion.js';

export default function TimelinePanel({ countryId, regionId, selectedEra, onEraSelect }) {
  const { loading, error, displayName, eras, isCountrySpecific } =
    useCountryOrRegion(countryId, regionId);

  if (loading) {
    return (
      <div className="timeline-panel">
        <p className="timeline-loading">Loading timeline…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="timeline-panel">
        <p className="timeline-error">Failed to load timeline.</p>
      </div>
    );
  }

  if (!eras) return null;

  return (
    <div className="timeline-panel">
      <h2 className="timeline-region-name">{displayName}</h2>
      {!isCountrySpecific && (
        <p className="timeline-fallback-note">Showing regional resources</p>
      )}
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

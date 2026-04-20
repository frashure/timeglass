import regionsData from '../data/regions.json';

const TYPE_ICONS = {
  video: '▶',
  book: '📖',
};

const TYPE_LABELS = {
  video: 'Video',
  book: 'Book',
};

export default function ContentPanel({ regionId, eraId }) {
  const region = regionsData.regions[regionId];
  if (!region) return null;

  const era = region.eras.find((e) => e.id === eraId);
  if (!era) return null;

  const videos = era.resources.filter((r) => r.type === 'video');
  const books = era.resources.filter((r) => r.type === 'book');

  return (
    <div className="content-panel">
      <div className="content-header">
        <h3 className="content-title">
          {region.name} <span className="content-era-label">· {era.label}</span>
        </h3>
        <p className="content-era-range">{era.display}</p>
      </div>

      {videos.length > 0 && (
        <section className="resource-section">
          <h4 className="resource-section-title">Videos</h4>
          <ul className="resource-list">
            {videos.map((resource, i) => (
              <ResourceCard key={i} resource={resource} />
            ))}
          </ul>
        </section>
      )}

      {books.length > 0 && (
        <section className="resource-section">
          <h4 className="resource-section-title">Books</h4>
          <ul className="resource-list">
            {books.map((resource, i) => (
              <ResourceCard key={i} resource={resource} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function ResourceCard({ resource }) {
  return (
    <li className="resource-card">
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="resource-link"
      >
        <span className="resource-icon">{TYPE_ICONS[resource.type]}</span>
        <span className="resource-text">
          <span className="resource-title">{resource.title}</span>
          <span className="resource-creator">{resource.creator}</span>
        </span>
        <span className="resource-arrow">→</span>
      </a>
    </li>
  );
}

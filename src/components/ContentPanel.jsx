import { useState, useEffect } from 'react';
import { useCountryOrRegion } from '../hooks/useCountryOrRegion.js';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

const TYPE_ICONS = {
  video: '▶',
  book: '📖',
};

export default function ContentPanel({
  countryId, regionId, eraId,
  user, findBookmark, addBookmark, removeBookmark, onAuthRequired,
}) {
  const { loading: scopeLoading, error: scopeError, scope, scopeId, displayName, isCountrySpecific } =
    useCountryOrRegion(countryId, regionId);

  const [eraData, setEraData] = useState(null);
  const [eraLoading, setEraLoading] = useState(false);
  const [eraError, setEraError] = useState(null);

  useEffect(() => {
    if (!scope || !scopeId || !eraId) return;

    let cancelled = false;
    setEraLoading(true);
    setEraError(null);
    setEraData(null);

    (async () => {
      try {
        const path = scope === 'country' ? 'countries' : 'regions';
        const res = await fetch(`${API_BASE}/${path}/${scopeId}/eras/${eraId}`);
        if (cancelled) return;
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) { setEraData(data); setEraLoading(false); }
      } catch {
        if (!cancelled) { setEraError('Failed to load resources'); setEraLoading(false); }
      }
    })();

    return () => { cancelled = true; };
  }, [scope, scopeId, eraId]);

  if (scopeLoading || eraLoading) {
    return <div className="content-panel"><p className="content-loading">Loading resources…</p></div>;
  }

  if (scopeError || eraError) {
    return <div className="content-panel"><p className="content-error">Failed to load resources.</p></div>;
  }

  if (!eraData) return null;

  const currentBookmark = isCountrySpecific && scope && scopeId
    ? findBookmark(scope, scopeId, eraId)
    : null;

  async function handleBookmarkToggle() {
    if (!user) { onAuthRequired(); return; }
    if (currentBookmark) {
      await removeBookmark(currentBookmark.id);
    } else {
      await addBookmark(scope, scopeId, eraId);
    }
  }

  const videos = eraData.resources.filter((r) => r.type === 'video');
  const books = eraData.resources.filter((r) => r.type === 'book');

  return (
    <div className="content-panel">
      <div className="content-header">
        <div className="content-header-row">
          <h3 className="content-title">
            {displayName} <span className="content-era-label">· {eraData.label}</span>
          </h3>
          {isCountrySpecific && (
            <button
              className={`bookmark-btn ${currentBookmark ? 'bookmark-btn--saved' : ''}`}
              onClick={handleBookmarkToggle}
              aria-label={currentBookmark ? 'Remove bookmark' : 'Save bookmark'}
              title={currentBookmark ? 'Remove bookmark' : 'Save bookmark'}
            >
              {currentBookmark ? '★' : '☆'}
            </button>
          )}
        </div>
        <p className="content-era-range">{eraData.display}</p>
        {!isCountrySpecific && (
          <p className="content-fallback-note">Showing regional resources</p>
        )}
      </div>

      {videos.length > 0 && (
        <section className="resource-section">
          <h4 className="resource-section-title">Videos</h4>
          <ul className="resource-list">
            {videos.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </ul>
        </section>
      )}

      {books.length > 0 && (
        <section className="resource-section">
          <h4 className="resource-section-title">Books</h4>
          <ul className="resource-list">
            {books.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
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

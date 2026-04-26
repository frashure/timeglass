export default function BookmarksPanel({ bookmarks, onNavigate, onRemove }) {
  return (
    <div className="bookmarks-panel">
      <h2 className="bookmarks-title">Saved</h2>
      {bookmarks.length === 0 ? (
        <p className="bookmarks-empty">
          No bookmarks yet. Open a country, select an era, and click the bookmark icon to save it.
        </p>
      ) : (
        <ul className="bookmarks-list">
          {bookmarks.map(bm => (
            <li key={bm.id} className="bookmark-item">
              <button className="bookmark-item-nav" onClick={() => onNavigate(bm)}>
                <span className="bookmark-item-name">{bm.scope_name}</span>
                <span className="bookmark-item-era">{bm.era_label} · {bm.era_display}</span>
              </button>
              <button
                className="bookmark-item-remove"
                onClick={() => onRemove(bm.id)}
                aria-label="Remove bookmark"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

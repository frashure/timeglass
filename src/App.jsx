import { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import TimelinePanel from './components/TimelinePanel';
import ContentPanel from './components/ContentPanel';
import AuthModal from './components/AuthModal';
import BookmarksPanel from './components/BookmarksPanel';
import REGION_MAPPING from './data/regionMapping.js';
import { useAuth } from './hooks/useAuth.js';
import { useBookmarks } from './hooks/useBookmarks.js';
import './App.css';

export default function App() {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedEra, setSelectedEra] = useState(null);
  const [showBookmarksPanel, setShowBookmarksPanel] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, authLoading, login, register, logout, token } = useAuth();
  const { bookmarks, findBookmark, addBookmark, removeBookmark } = useBookmarks(user, token);

  const selectedRegionId = selectedCountryId != null
    ? (REGION_MAPPING[selectedCountryId] ?? null)
    : null;

  function handleCountrySelect(countryId) {
    setSelectedCountryId(countryId);
    setSelectedEra(null);
    setShowBookmarksPanel(false);
  }

  function handleEraSelect(eraId) {
    setSelectedEra(eraId);
  }

  function handleBack() {
    if (showBookmarksPanel) { setShowBookmarksPanel(false); return; }
    if (selectedEra) { setSelectedEra(null); return; }
    setSelectedCountryId(null);
  }

  function handleBookmarkNavigate(bm) {
    setSelectedCountryId(parseInt(bm.scope_id));
    setSelectedEra(bm.era_id);
    setShowBookmarksPanel(false);
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key !== 'Escape') return;
      if (showAuthModal) { setShowAuthModal(false); return; }
      handleBack();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCountryId, selectedEra, showBookmarksPanel, showAuthModal]);

  const showSidebar = selectedCountryId !== null || showBookmarksPanel;
  const showTimeline = selectedCountryId !== null && !showBookmarksPanel;
  const showContent = showTimeline && selectedEra !== null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <span className="app-logo-icon">⌛</span>
          <span className="app-logo-text">Timeglass</span>
        </div>
        <p className="app-tagline">Explore world history through time and place</p>

        <div className="header-actions">
          {!authLoading && (
            user ? (
              <>
                <button
                  className={`header-btn ${showBookmarksPanel ? 'header-btn--active' : ''}`}
                  onClick={() => setShowBookmarksPanel(v => !v)}
                >
                  Saved{bookmarks.length > 0 && <span className="header-badge">{bookmarks.length}</span>}
                </button>
                <span className="header-user">{user.email}</span>
                <button className="header-btn" onClick={logout}>Sign out</button>
              </>
            ) : (
              <button className="header-btn" onClick={() => setShowAuthModal(true)}>Sign in</button>
            )
          )}
        </div>
      </header>

      <main className="app-main">
        <div className={`map-container ${showSidebar ? 'map-container--shrunk' : ''}`}>
          {!selectedCountryId && !showBookmarksPanel && (
            <div className="map-hint">Click a highlighted country to begin</div>
          )}
          <WorldMap
            onCountrySelect={handleCountrySelect}
            selectedCountryId={selectedCountryId}
          />
        </div>

        {showSidebar && (
          <div className="sidebar">
            <button className="back-button" onClick={handleBack}>
              ← {showBookmarksPanel ? 'Back to map' : selectedEra ? 'Back to timeline' : 'Back to map'}
            </button>

            {showBookmarksPanel ? (
              <BookmarksPanel
                bookmarks={bookmarks}
                onNavigate={handleBookmarkNavigate}
                onRemove={removeBookmark}
              />
            ) : (
              <>
                <TimelinePanel
                  countryId={selectedCountryId}
                  regionId={selectedRegionId}
                  selectedEra={selectedEra}
                  onEraSelect={handleEraSelect}
                />
                {showContent && (
                  <ContentPanel
                    countryId={selectedCountryId}
                    regionId={selectedRegionId}
                    eraId={selectedEra}
                    user={user}
                    findBookmark={findBookmark}
                    addBookmark={addBookmark}
                    removeBookmark={removeBookmark}
                    onAuthRequired={() => setShowAuthModal(true)}
                  />
                )}
              </>
            )}
          </div>
        )}
      </main>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          login={login}
          register={register}
        />
      )}
    </div>
  );
}

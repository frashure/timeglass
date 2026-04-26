import { useState, useEffect } from 'react';
import WorldMap from './components/WorldMap';
import TimelinePanel from './components/TimelinePanel';
import ContentPanel from './components/ContentPanel';
import REGION_MAPPING from './data/regionMapping.js';
import './App.css';

export default function App() {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedEra, setSelectedEra] = useState(null);

  const selectedRegionId = selectedCountryId != null
    ? (REGION_MAPPING[selectedCountryId] ?? null)
    : null;

  function handleCountrySelect(countryId) {
    setSelectedCountryId(countryId);
    setSelectedEra(null);
  }

  function handleEraSelect(eraId) {
    setSelectedEra(eraId);
  }

  function handleBack() {
    if (selectedEra) {
      setSelectedEra(null);
    } else {
      setSelectedCountryId(null);
    }
  }

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') handleBack();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedCountryId, selectedEra]);

  const showTimeline = selectedCountryId !== null;
  const showContent = selectedCountryId !== null && selectedEra !== null;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-logo">
          <span className="app-logo-icon">⌛</span>
          <span className="app-logo-text">Timeglass</span>
        </div>
        <p className="app-tagline">Explore world history through time and place</p>
      </header>

      <main className="app-main">
        <div className={`map-container ${showTimeline ? 'map-container--shrunk' : ''}`}>
          {!selectedCountryId && (
            <div className="map-hint">Click a highlighted country to begin</div>
          )}
          <WorldMap
            onCountrySelect={handleCountrySelect}
            selectedCountryId={selectedCountryId}
          />
        </div>

        {showTimeline && (
          <div className="sidebar">
            <button className="back-button" onClick={handleBack}>
              ← {selectedEra ? 'Back to timeline' : 'Back to map'}
            </button>
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
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

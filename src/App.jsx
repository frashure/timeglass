import { useState } from 'react';
import WorldMap from './components/WorldMap';
import TimelinePanel from './components/TimelinePanel';
import ContentPanel from './components/ContentPanel';
import './App.css';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedEra, setSelectedEra] = useState(null);

  function handleRegionSelect(regionId) {
    setSelectedRegion(regionId);
    setSelectedEra(null);
  }

  function handleEraSelect(eraId) {
    setSelectedEra(eraId);
  }

  function handleBack() {
    if (selectedEra) {
      setSelectedEra(null);
    } else {
      setSelectedRegion(null);
    }
  }

  const showTimeline = selectedRegion !== null;
  const showContent = selectedRegion !== null && selectedEra !== null;

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
          {!selectedRegion && (
            <div className="map-hint">Click a highlighted region to begin</div>
          )}
          <WorldMap
            onRegionSelect={handleRegionSelect}
            selectedRegion={selectedRegion}
          />
        </div>

        {showTimeline && (
          <div className="sidebar">
            <button className="back-button" onClick={handleBack}>
              ← {selectedEra ? 'Back to timeline' : 'Back to map'}
            </button>
            <TimelinePanel
              regionId={selectedRegion}
              selectedEra={selectedEra}
              onEraSelect={handleEraSelect}
            />
            {showContent && (
              <ContentPanel regionId={selectedRegion} eraId={selectedEra} />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

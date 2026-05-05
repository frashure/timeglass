import { useState, useEffect } from 'react';
import COUNTRY_NAMES from '../data/countryNames.js';

import API_BASE from '../config.js';

/**
 * Resolves display data for a selected country.
 *
 * Tries GET /countries/{countryId} first. If the country has no
 * country-specific entry (404), falls back to GET /regions/{regionId}.
 *
 * Returns:
 *   { loading, error, scope, scopeId, displayName, eras, isCountrySpecific }
 */
export function useCountryOrRegion(countryId, regionId) {
  const [state, setState] = useState({ loading: true, error: null });

  useEffect(() => {
    if (countryId == null || !regionId) return;

    let cancelled = false;
    setState({ loading: true, error: null });

    (async () => {
      try {
        const res = await fetch(`${API_BASE}/countries/${countryId}`);
        if (cancelled) return;

        if (res.ok) {
          const country = await res.json();
          if (!cancelled) setState({
            loading: false, error: null,
            scope: 'country', scopeId: String(countryId),
            displayName: country.name, eras: country.eras,
            isCountrySpecific: true,
          });
          return;
        }

        if (res.status !== 404) throw new Error(`HTTP ${res.status}`);

        const regionRes = await fetch(`${API_BASE}/regions/${regionId}`);
        if (cancelled) return;
        if (!regionRes.ok) throw new Error(`HTTP ${regionRes.status}`);

        const region = await regionRes.json();
        if (!cancelled) setState({
          loading: false, error: null,
          scope: 'region', scopeId: regionId,
          displayName: COUNTRY_NAMES[countryId] ?? region.name,
          eras: region.eras,
          isCountrySpecific: false,
        });
      } catch {
        if (!cancelled) setState({ loading: false, error: 'Failed to load data' });
      }
    })();

    return () => { cancelled = true; };
  }, [countryId, regionId]);

  return state;
}

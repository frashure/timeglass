import { useState, useEffect } from 'react';

import API_BASE from '../config.js';

export function useBookmarks(user, token) {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (!user) { setBookmarks([]); return; }
    fetch(`${API_BASE}/bookmarks`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.ok ? r.json() : [])
      .then(setBookmarks)
      .catch(() => setBookmarks([]));
  }, [user]);

  function findBookmark(scope, scopeId, eraId) {
    return bookmarks.find(
      b => b.scope === scope && b.scope_id === scopeId && b.era_id === eraId
    ) ?? null;
  }

  async function addBookmark(scope, scopeId, eraId) {
    const res = await fetch(`${API_BASE}/bookmarks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ scope, scope_id: scopeId, era_id: eraId }),
    });
    if (!res.ok) throw new Error('Failed to save bookmark');
    const bm = await res.json();
    setBookmarks(prev => [bm, ...prev]);
  }

  async function removeBookmark(bookmarkId) {
    await fetch(`${API_BASE}/bookmarks/${bookmarkId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  }

  return { bookmarks, findBookmark, addBookmark, removeBookmark };
}

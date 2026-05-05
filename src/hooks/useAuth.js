import { useState, useEffect, useRef } from 'react';

import API_BASE from '../config.js';
const TOKEN_KEY = 'tg_token';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const tokenRef = useRef(localStorage.getItem(TOKEN_KEY));

  useEffect(() => {
    if (!tokenRef.current) { setAuthLoading(false); return; }
    fetch(`${API_BASE}/auth/me`, { headers: { Authorization: `Bearer ${tokenRef.current}` } })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setUser)
      .catch(() => { localStorage.removeItem(TOKEN_KEY); tokenRef.current = null; })
      .finally(() => setAuthLoading(false));
  }, []);

  async function _applyToken(access_token) {
    localStorage.setItem(TOKEN_KEY, access_token);
    tokenRef.current = access_token;
    const me = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(r => r.json());
    setUser(me);
  }

  async function login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail ?? 'Login failed');
    await _applyToken(data.access_token);
  }

  async function register(email, password) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail ?? 'Registration failed');
    await _applyToken(data.access_token);
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    tokenRef.current = null;
    setUser(null);
  }

  function token() { return tokenRef.current; }

  return { user, authLoading, login, register, logout, token };
}

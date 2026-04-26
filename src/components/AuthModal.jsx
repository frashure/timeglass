import { useState } from 'react';

export default function AuthModal({ onClose, login, register }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(email, password);
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={e => e.stopPropagation()}>
        <button className="auth-close" onClick={onClose} aria-label="Close">×</button>
        <h2 className="auth-title">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="auth-label">
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="auth-input"
              autoFocus
              required
            />
          </label>
          <label className="auth-label">
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="auth-input"
              required
              minLength={6}
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'}
          </button>
        </form>
        <p className="auth-switch">
          {mode === 'login' ? (
            <>No account?{' '}
              <button className="auth-switch-btn" onClick={() => { setMode('register'); setError(null); }}>
                Create one
              </button>
            </>
          ) : (
            <>Have an account?{' '}
              <button className="auth-switch-btn" onClick={() => { setMode('login'); setError(null); }}>
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

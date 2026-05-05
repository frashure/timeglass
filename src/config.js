// Runtime API URL — injected by the container entrypoint into window.__TIMEGLASS_CONFIG__.
// Falls back to the Vite build-time variable so local `npm run dev` still works.
const API_BASE = window.__TIMEGLASS_CONFIG__?.apiUrl ?? import.meta.env.VITE_API_URL ?? '';

export default API_BASE;

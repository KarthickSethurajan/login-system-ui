export const API_URL =
  import.meta.env.VITE_API_URL ||
  (window.location.host.includes('github.io')
    ? 'https://login-backend-rulc.onrender.com'
    : 'http://localhost:5000');
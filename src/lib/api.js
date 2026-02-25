/**
 * Thin fetch wrapper around the backend API.
 *
 * The base URL is read from the VITE_API_URL environment variable:
 *   - Development  →  .env            → http://localhost:5000
 *   - Production   →  .env.production → https://api.wimaserenity.com
 *
 * Usage:
 *   import api from '../lib/api'
 *
 *   // GET
 *   const data = await api.get('/rooms')
 *
 *   // POST
 *   const result = await api.post('/inquiries', { name, email, message })
 */

const BASE_URL = import.meta.env.VITE_API_URL

async function request(path, options = {}) {
  const url = `${BASE_URL}/api${path}`

  const config = {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  }

  const response = await fetch(url, config)
  const json = await response.json()

  if (!response.ok) {
    // Backend returns { success: false, error: "..." }
    throw new Error(json.error || `Request failed: ${response.status}`)
  }

  return json
}

const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
}

export default api

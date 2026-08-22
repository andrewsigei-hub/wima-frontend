const BASE_URL = import.meta.env.VITE_API_URL

let unauthorizedHandler = null

// Registered by AuthProvider so a 401 (invalid/expired token) can trigger
// logout + redirect from here, without this module depending on React context.
export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler
}

async function request(path, token, options = {}) {
  const url = `${BASE_URL}/api${path}`

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  }

  const response = await fetch(url, config)

  let json
  try {
    json = await response.json()
  } catch {
    if (response.status === 429) {
      throw new Error('Too many requests — please wait a moment and try again.')
    }
    throw new Error(`Request failed: ${response.status}`)
  }

  if (!response.ok) {
    // 401 means the token itself is missing/invalid/expired - the session is
    // dead, so log out. 403 means a valid session lacks permission for this
    // one action - surface it as a normal error instead of ending the session.
    if (response.status === 401) {
      unauthorizedHandler?.()
    }
    throw new Error(json.error || `Request failed: ${response.status}`)
  }

  return json
}

const adminApi = {
  get: (path, token) => request(path, token),
  post: (path, body, token) =>
    request(path, token, { method: 'POST', body: JSON.stringify(body) }),
  patch: (path, body, token) =>
    request(path, token, { method: 'PATCH', body: JSON.stringify(body) }),
  del: (path, token) => request(path, token, { method: 'DELETE' }),
}

export default adminApi

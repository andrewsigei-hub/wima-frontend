const BASE_URL = import.meta.env.VITE_API_URL

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
  const json = await response.json()

  if (!response.ok) {
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

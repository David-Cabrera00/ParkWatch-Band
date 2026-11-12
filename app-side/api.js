export function createApi({ baseUrl = '', fetchImpl = globalThis.fetch } = {}) {
  return { async request(path, options = {}) { if (!fetchImpl || !baseUrl) throw new Error('API not configured'); const response = await fetchImpl(baseUrl + path, { headers: { Accept: 'application/json', ...options.headers }, ...options }); if (!response.ok) throw new Error('HTTP ' + response.status); return response.json(); } };
}

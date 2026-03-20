export function buildApiUrl(baseUrl, endpoint, params) {
  const base = encodeURI(baseUrl + endpoint);

  const query = Object.entries(params)
    .map(([key, value]) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join("&");

  return `${base}?${query}`;
}

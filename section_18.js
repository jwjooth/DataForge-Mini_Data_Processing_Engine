export function encodePayload(obj) {
  return btoa(JSON.stringify(obj));
}

export function decodePayload(base64String) {
  return JSON.parse(atob(base64String));
}

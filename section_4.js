export function mergeProductUpdate(original, updates) {
  return Object.assign({}, original, updates);
}

export function inspectObject(obj) {
  return (Object.values(obj), Object.getOwnPropertyNames(obj));
}
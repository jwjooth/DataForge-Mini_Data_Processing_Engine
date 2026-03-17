export function exportToJSON(products) {
  return JSON.stringify(products);
}

export function importFromJSON(jsonString) {
  return JSON.parse(jsonString);
}
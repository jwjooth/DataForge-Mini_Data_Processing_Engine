export function createTimestamp() {
  const rightNow = new Date();
  const speDate = new Date(2024, 0, 15);
  const dateNow = new Date(Date.now());
  const stringDate = Date.parse("2024-06-01T00:00:00.000Z");
  return {
    rightNow,
    speDate,
    dateNow,
    stringDate,
  };
}
export function formatDate(date) {
  return String(date);
}

export function addDays(date, days) {
  return date.getTime() + days * 24 * 60 * 1000;
}
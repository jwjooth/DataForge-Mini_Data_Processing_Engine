export const NumberUtils = {
  parsePrice(value) {
    return Number.isNaN(Number(value)) ? 0 : Number(value);
  },
  isValidPrice(value) {
    return typeof value === "number" && value > 0 ? true : false;
  },
  formatCurrency(value, locale, currency) {
    return value.toLocaleString(locale, { style: "currency", currency });
  },
  toRadix(value, radix) {
    return value.toString(radix);
  },
  limits() {
    return {
      min: Number.MIN_VALUE,
      max: Number.MAX_VALUE,
    };
  },
  checkInteger(value) {
    return Number.isInteger(value) ? true : false;
  },
};
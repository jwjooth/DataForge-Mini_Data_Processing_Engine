export function TextProcessor() {
  function findAllElectronics(products) {
    return products.map((p) => p.id).filter((id) => /^P\d{3}$/.test(id));
  }

  function findFirstPriceIndex(str) {
    return str.search(/\d+\.\d{2}/);
  }

  function sanitizeName(name) {
    return name.replace(/[^a-zA-Z0-9 ]/g, "");
  }

  function sanitizeAllTags(tags) {
    return tags.map((tag) => tag.replaceAll("-", " "));
  }

  function parsePriceTokens(str) {
    return str.trim().split(/\s+/);
  }

  return {
    findAllElectronics,
    findFirstPriceIndex,
    sanitizeName,
    sanitizeAllTags,
    parsePriceTokens,
  };
}

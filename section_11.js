export function extractUniqueTags(products) {
  const set = new Set();
  products.forEach((product) => {
    set.add(product);
  });
  return set;
}

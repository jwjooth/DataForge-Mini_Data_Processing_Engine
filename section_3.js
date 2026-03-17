import { StringUtils } from "./section_2.js";
import { NumberUtils } from "./section_1.js";

export function normalizeProducts(rawArray) {
  let data = [];
  rawArray.forEach((element) => {
    data.push({
      id: element.id,
      name: StringUtils.normalize(element.name),
      slug: StringUtils.toSlug(StringUtils.normalize(element.name)),
      category: element.category,
      price: NumberUtils.parsePrice(element.price),
      stock: element.stock,
      tags: element.tags,
      valid: NumberUtils.isValidPrice(element.price),
    });
  });
  return data;
}

export class ProductQueue {
  data = [];
  enqueue(product) {
    this.data.push(product);
  }
  dequeue() {
    return this.data.shift();
  }
  peek() {
    return this.data[0];
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return this.data.length === 0 ? true : false;
  }
}

export class UndoStack {
  data = [];
  push(action) {
    this.data.push(action);
  }
  pop() {
    return this.data.pop();
  }
  peek() {
    return this.data[this.data.length - 1];
  }
  size() {
    return this.data.length;
  }
}

export function searchProducts(products, query) {
  let normalizeProducts = query.toLowerCase();
  let foundProduct = products.find((product) =>
    product.id.toLowerCase().includes(normalizeProducts),
  );
  let foundIndex = products.findIndex((product) =>
    product.id.toLowerCase().includes(normalizeProducts),
  );
  let hasProduct = products.includes(foundProduct);
  let index = products.indexOf(foundProduct);
  let lastIndex = products.lastIndexOf(foundProduct);
  return {
    foundProduct,
    foundIndex,
    hasProduct,
    index,
    lastIndex,
  };
}

export function filterProducts(products) {
  let inStock = [];
  let invalid = [];
  products.filter((product) => {
    if (NumberUtils.isValidPrice(product.stock)) {
      inStock.push(product);
    } else {
      invalid.push(product);
    }
  });
  return { inStock, invalid };
}

export function transformProducts(products) {
  const formattedPrices = products.map((value) => {
    return {
      id: value.id,
      name: value.name.trim(),
      formattedPrice: NumberUtils.formatCurrency(value.price, "en-US", "USD"),
    };
  });
  const totalInventoryValue = products.reduce((total, p) => {
    const price = NumberUtils.parsePrice(p.price);
    if (!NumberUtils.isValidPrice(price)) return total;
    return total + price * p.stock;
  }, 0);
  const reversedProducts = products.reduceRight((acc, cur) => {
    acc.push(StringUtils.normalize(cur.name));
    return acc;
  }, []);
  return {
    formattedPrices,
    totalInventoryValue,
    reversedProducts,
  };
}

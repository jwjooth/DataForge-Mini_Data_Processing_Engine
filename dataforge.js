const RAW_PRODUCTS = [
  {
    id: "P001",
    name: "  Mechanical Keyboard  ",
    category: "Electronics",
    price: "149.99",
    stock: 30,
    tags: ["gaming", "keyboard", "rgb"],
  },
  {
    id: "P002",
    name: "ergonomic mouse",
    category: "Electronics",
    price: "79.50",
    stock: 0,
    tags: ["mouse", "wireless", "ergonomic"],
  },
  {
    id: "P003",
    name: "STANDING DESK",
    category: "Furniture",
    price: "599.00",
    stock: 5,
    tags: ["desk", "adjustable", "ergonomic"],
  },
  {
    id: "P004",
    name: "usb-c hub",
    category: "Electronics",
    price: "not_a_price",
    stock: 12,
    tags: ["usb", "hub", "multi-port"],
  },
  {
    id: "P005",
    name: "Noise Cancelling Headphones",
    category: "Electronics",
    price: "249.99",
    stock: 18,
    tags: ["audio", "wireless", "anc"],
  },
  {
    id: "P006",
    name: "laptop stand",
    category: "Accessories",
    price: "49.00",
    stock: 50,
    tags: ["stand", "ergonomic", "aluminum"],
  },
  {
    id: "P007",
    name: "webcam 4k",
    category: "Electronics",
    price: "129.00",
    stock: 0,
    tags: ["camera", "4k", "streaming"],
  },
  {
    id: "P008",
    name: "desk lamp",
    category: "Accessories",
    price: "35.00",
    stock: 100,
    tags: ["lighting", "led", "adjustable"],
  },
  {
    id: "P009",
    name: "MONITOR 27 INCH",
    category: "Electronics",
    price: "399.00",
    stock: 8,
    tags: ["monitor", "4k", "ips"],
  },
  {
    id: "P010",
    name: "cable organizer",
    category: "Accessories",
    price: "12.99",
    stock: 200,
    tags: ["cable", "organizer", "desk"],
  },
];

// section 1
const NumberUtils = {
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

// demo requirement
console.info("== DEMO SECTION 1 ==");
console.log(NumberUtils.parsePrice("149.99")); // 149.99
console.log(NumberUtils.parsePrice("not_a_price")); // 0
console.log(NumberUtils.isValidPrice(49.0)); // true
console.log(NumberUtils.isValidPrice(0)); // false
console.log(NumberUtils.formatCurrency(149.99, "en-US", "USD")); // $149.99
console.log(NumberUtils.toRadix(255, 16)); // ff
console.log(NumberUtils.limits()); // { min: 5e-324, max: 1.7976931348623157e+308 }
console.log(NumberUtils.checkInteger(30)); // true
console.log(NumberUtils.checkInteger(149.99)); // false

// section 2
const StringUtils = {
  normalize(str) {
    const words = str.toLowerCase().trim().split(" ");
    const result = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return result.join(" ");
  },
  toSlug(str) {
    return str.toLowerCase().trim().replaceAll(" ", "-");
  },
  truncate(str, maxLength) {
    if (str.length > maxLength) {
      const data = [];
      const arr = str.split("");
      for (let i = 0; i < maxLength; i++) {
        data.push(arr[i]);
      }
      return data.join("") + "...";
    } else {
      return str;
    }
  },
  countWords(str) {
    return str.split(" ").length;
  },
  containsKeyword(str, keyword) {
    return str.toLowerCase().includes(keyword.toLowerCase()) ? true : false;
  },
  extractId(str) {
    return str.substring(1);
  },
};

// demo requirement
console.info("== DEMO SECTION 2 ==");
console.log(StringUtils.normalize("  mechanical KEYBOARD  ")); // "Mechanical Keyboard"
console.log(StringUtils.toSlug("Noise Cancelling Headphones")); // "noise-cancelling-headphones"
console.log(StringUtils.truncate("Noise Cancelling Headphones", 10)); // "Noise Canc..."
console.log(StringUtils.countWords("usb c hub multi-port")); // 4
console.log(StringUtils.containsKeyword("Ergonomic Mouse", "mouse")); // true
console.log(StringUtils.extractId("P007")); // "007"

// section 3
function normalizeProducts(rawArray) {
  data = [];
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

class ProductQueue {
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

class UndoStack {
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

function searchProducts(products, query) {
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

function filterProducts(products) {
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

function transformProducts(products) {
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

// section 4
const PIPELINE_CONFIG = {
  version: "1.0.0",
  defaultLocale: "en-US",
  defaultCurrency: "USD",
  maxProductNameLength: 50,
};

function mergeProductUpdate(original, updates) {
  return Object.assign({}, original, updates);
}

function inspectObject(obj) {
  return (Object.values(obj), Object.getOwnPropertyNames(obj));
}

// section 5
function exportToJSON(products) {
  return JSON.stringify(products);
}

function importFromJSON(jsonString) {
  return JSON.parse(jsonString);
}

// section 6
function calculateBigInventory() {
  const warehouseA = 9007199254740991n;
  const warehouseB = 9007199254740991n;
  return (
    BigInt(warehouseA + warehouseB) + typeof BigInt(warehouseA + warehouseB)
  );
}

// section 7
function createTimestamp() {
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

function formatDate(date) {}

function addDays(date, days) {}

// section 8
const StatEngine = {
  average(numbers) {
    Math.round();
  },
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },
  randomInt(min, max){

  },
  power(){

  },
  squareRoot(value){

  },
  absoluteValue(value){

  },
  priceStats(products){
    
  }
};

// demo requirement
console.info("== DEMO 3.1 ==");
console.log(normalizeProducts(RAW_PRODUCTS));

console.info("== DEMO 3.2 ==");
const productQueue = new ProductQueue();
productQueue.enqueue({
  id: "P001",
  name: "  Mechanical Keyboard  ",
  category: "Electronics",
  price: "149.99",
  stock: 30,
  tags: ["gaming", "keyboard", "rgb"],
});
productQueue.enqueue({
  id: "P002",
  name: "ergonomic mouse",
  category: "Electronics",
  price: "79.50",
  stock: 0,
  tags: ["mouse", "wireless", "ergonomic"],
});
productQueue.enqueue({
  id: "P003",
  name: "STANDING DESK",
  category: "Furniture",
  price: "599.00",
  stock: 5,
  tags: ["desk", "adjustable", "ergonomic"],
});
console.info(productQueue.data);
console.info(productQueue.dequeue());
console.log(productQueue.peek());
console.log(productQueue.size());
console.log(productQueue.isEmpty());

console.info("== DEMO 3.3 ==");
const undoStack = new UndoStack();
undoStack.push("Dance");
undoStack.push("Singing");
undoStack.push("Gaming");
console.log(undoStack.data);
console.log(undoStack.pop());
console.log(undoStack.peek());
console.log(undoStack.size());

console.info("== DEMO 3.4 ==");
const searchProduct = new searchProducts(RAW_PRODUCTS, "P005");
console.log(searchProduct);

console.info("== DEMO 3.5 ==");
const filterProduct = new filterProducts(RAW_PRODUCTS);
console.log(filterProduct);

console.info("== DEMO 3.6 ==");
const transformProduct = new transformProducts(RAW_PRODUCTS);
console.log(transformProduct);

console.info("== DEMO 4.1 ==");
const frozenMethods = Object.freeze(NumberUtils);
frozenMethods.isValidPrice = () => "Halo";
frozenMethods.newMethod = () => "Hai";
console.log(frozenMethods.isValidPrice);
console.log(frozenMethods.newMethod);

console.info("== DEMO 4.2 ==");
const sealMethods = Object.seal(PIPELINE_CONFIG);
sealMethods.version = "this is new version";
sealMethods.debugMode = () => "this is debugMode";
delete sealMethods.defaultCurrency;
console.info(sealMethods);

console.info("== DEMO 4.3 ==");
const mergeProduct = new mergeProductUpdate(
  {
    id: "P002",
    name: "ergonomic mouse",
    category: "Electronics",
    price: "79.50",
    stock: 0,
    tags: ["mouse", "wireless", "ergonomic"],
  },
  {
    id: "POO3",
    name: "Premium Mouse",
    stock: 1,
  },
);
console.log(mergeProduct);

console.info("== DEMO 4.4 ==");
const inspectObjects = new inspectObject(PIPELINE_CONFIG);
console.log(inspectObjects);

console.info("== DEMO 5.1 ==");
const normalizeProduct = normalizeProducts(RAW_PRODUCTS);
const toJSON = exportToJSON(normalizeProduct);
const toString = new importFromJSON(toJSON);
console.log(toJSON);
console.log(toString);

console.info("== DEMO 6.1 ==");
const calculateBigInventories = new calculateBigInventory();
console.log(Number.MAX_SAFE_INTEGER);
console.log(BigInt(Number.MAX_SAFE_INTEGER));
console.log(typeof BigInt(Number.MAX_SAFE_INTEGER));

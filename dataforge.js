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

Object.freeze(NumberUtils);

// demo requirement
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
  extractId(str){
    return str.substring(1);
  }
};

// demo requirement
console.log(StringUtils.normalize("  mechanical KEYBOARD  ")); // "Mechanical Keyboard"
console.log(StringUtils.toSlug("Noise Cancelling Headphones")); // "noise-cancelling-headphones"
console.log(StringUtils.truncate("Noise Cancelling Headphones", 10)); // "Noise Canc..."
console.log(StringUtils.countWords("usb c hub multi-port")); // 4
console.log(StringUtils.containsKeyword("Ergonomic Mouse", "mouse")); // true
console.log(StringUtils.extractId("P007")); // "007"

// section 3
function normalizeProducts(rawArray){
  rawArray.forEach(element => {
    console.log(element);
  });
}
console.log("╔═══════════════════════════════════╗");
console.log("║      DataForge Engine v1.0        ║");
console.log("╚═══════════════════════════════════╝");

("use strict");
import {
  normalizeProducts,
  ProductQueue,
  UndoStack,
  searchProducts,
  filterProducts,
  transformProducts,
} from "./section_3.js";
import { Validator } from "./section_13.js";
import { schemaHandler } from "./section_15.js";
import { ReflectUtils } from "./section_16.js";
import { RAW_PRODUCTS } from "./raw_data.js";
import { NumberUtils } from "./section_1.js";
import { StringUtils } from "./section_2.js";
import { mergeProductUpdate, inspectObject } from "./section_4.js";
import { exportToJSON, importFromJSON } from "./section_5.js";
import { calculateBigInventory } from "./section_6.js";
import { createTimestamp, formatDate, addDays } from "./section_7.js";
import { StatEngine } from "./section_8.js";
import { PIPELINE_CONFIG } from "./raw_data.js";
import { BooleanFlag } from "./section_9.js";
import { buildProductMap } from "./section_10.js";
import { extractUniqueTags } from "./section_11.js";
import { TextProcessor } from "./section_14.js";
import { encodePayload, decodePayload } from "./section_18.js";
import { buildApiUrl } from "./section_17.js";
import {
  SYM_CREATED_AT,
  SYM_PIPELINE,
  SYM_PIPELINE_REF,
  SYM_SOURCE,
  SYM_VERSION,
} from "./section_12.js";
import { runFormula } from "./section_19.js";

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

// demo requirement
console.info("== DEMO SECTION 2 ==");
console.log(StringUtils.normalize("  mechanical KEYBOARD  ")); // "Mechanical Keyboard"
console.log(StringUtils.toSlug("Noise Cancelling Headphones")); // "noise-cancelling-headphones"
console.log(StringUtils.truncate("Noise Cancelling Headphones", 10)); // "Noise Canc..."
console.log(StringUtils.countWords("usb c hub multi-port")); // 4
console.log(StringUtils.containsKeyword("Ergonomic Mouse", "mouse")); // true
console.log(StringUtils.extractId("P007")); // "007"

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
// frozenMethods.isValidPrice = () => "Halo";
// frozenMethods.newMethod = () => "Hai";
console.log(frozenMethods.isValidPrice);
console.log(frozenMethods.newMethod);

console.info("== DEMO 4.2 ==");
const sealMethods = Object.seal(PIPELINE_CONFIG);
sealMethods.version = "this is new version";
// sealMethods.debugMode = () => "this is debugMode";
// delete sealMethods.defaultCurrency;
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

console.info("== DEMO 7.1 ==");
const creTimestamp = new createTimestamp();
console.log(creTimestamp);

console.info("== DEMO 7.2 ==");
const forDate = formatDate(new Date());
console.log(forDate);

console.info("== DEMO 7.3 ==");
const addDay = addDays(new Date(), 1);
console.log(addDay);

console.info("== SECTION 8 ==");
console.log(StatEngine.average([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
console.log(StatEngine.clamp(10, 0, 5));
console.log(StatEngine.randomInt(-3, 0, 5));
console.log(StatEngine.power(2, 3));
console.log(StatEngine.squareRoot(144));
console.log(StatEngine.absoluteValue("-5"));
console.log(StatEngine.priceStats(RAW_PRODUCTS));

console.info("== DEMO 9 ==");
const boolFlag1 = new BooleanFlag(1).toString();
const boolFlag2 = new BooleanFlag(0).valueOf();
const boolFlag3 = new BooleanFlag("").valueOf();
const boolFlag4 = new BooleanFlag(true).toggle().toggle().valueOf();
console.log(boolFlag1);
console.log(boolFlag2);
console.log(boolFlag3);
console.log(boolFlag4);

console.info("== DEMO 10 ==");
const buildProduct = new buildProductMap(RAW_PRODUCTS);
console.log(buildProduct);
console.log(buildProduct.get("P001"));
console.log(buildProduct.has("P999"));
console.log(buildProduct.size);
console.log(buildProduct.delete("P010"));
console.log(buildProduct.get("P006"));
console.log(buildProduct.clear());
console.log(buildProduct);

console.info("== DEMO 11 ==");
const extractUnique = new extractUniqueTags(RAW_PRODUCTS);
console.log(extractUnique.has("ergonomic"));
console.log(extractUnique.has("vr-headset"));
console.log(extractUnique.size);
console.log(extractUnique.delete("led"));
console.log(extractUnique.has("ergonomic"));
extractUnique.forEach((product) => {
  console.log(product);
});

console.info("== DEMO 12 ==");
const product = {
  id: "P001",
  name: "Mechanical Keyboard",
  price: 149.99,
};

product[SYM_CREATED_AT] = new Date().toISOString();
product[SYM_SOURCE] = "DataForge-v1";
product[SYM_VERSION] = "1.0.0";
console.log("Object.keys:", Object.keys(product));
console.log("Created At:", product[SYM_CREATED_AT]);
console.log("Symbols:", Object.getOwnPropertySymbols(product));
console.log(SYM_PIPELINE === SYM_PIPELINE_REF);
console.log(Symbol("test") === Symbol("test"));

console.info("== DEMO 13 ==");
console.log("=== Product ID ===");
console.log(Validator.isValidProductId("P001")); // true
console.log(Validator.isValidProductId("P1234")); // false
console.log(Validator.isValidProductId("A001")); // false

console.log("\n=== Email ===");
console.log(Validator.isValidEmail("test@mail.com")); // true
console.log(Validator.isValidEmail("bad@email")); // false

console.log("\n=== Extract Numbers ===");
console.log(Validator.extractNumbers("P001 costs $149.99 with 30 stock")); // ["001", "149", "99", "30"]

console.log("\n=== Find Category ===");
console.log(Validator.findCategory("Best electronics deals")); // Electronics
console.log(Validator.findCategory("home furniture sale")); // furniture
console.log(Validator.findCategory("no category")); // null

console.log("\n=== Multiline ===");
console.log(Validator.isMultiline("One line")); // false
console.log(Validator.isMultiline("Line 1\nLine 2")); // true

console.info("== DEMO 14 ==");
const textProcessor = TextProcessor();
console.log(textProcessor.findAllElectronics(RAW_PRODUCTS));
console.log(textProcessor.findFirstPriceIndex("599.00"));
console.log(textProcessor.sanitizeName("usb-c hub!!"));
console.log(textProcessor.parsePriceTokens("149.99 30 Electronics"));

console.info("== DEMO 15 ==");
const guarded = new Proxy(product, schemaHandler);

// ✅ valid
guarded.price = 299.99;
guarded.stock = 5;

// ❌ invalid
try {
  guarded.price = "cheap";
} catch (e) {
  console.error(e.message);
}

try {
  guarded.stock = -5;
} catch (e) {
  console.error(e.message);
}

// GET existing
console.log(guarded.name);

// GET missing
console.log(guarded.nonExistent);

console.info("== DEMO 16 ==");
product[SYM_CREATED_AT] = new Date().toISOString();
product[SYM_VERSION] = "1.0";

// get
console.log(ReflectUtils.getProperty(product, "name"));

// set
ReflectUtils.setProperty(product, "price", 75);
console.log(product.price);

// has
console.log(ReflectUtils.hasProperty(product, "price")); // true

// delete
ReflectUtils.deleteProperty(product, "price");
console.log(product.price); // undefined

// list keys (includes Symbols)
console.log(ReflectUtils.listKeys(product));

console.info("== DEMO 17 ==");
const url = buildApiUrl("https://api.dataforge.io", "/products", {
  query: "mechanical keyboard",
  category: "Electronics & More",
  page: 1,
});

console.log(url);
// https://api.dataforge.io/products?query=mechanical%20keyboard&category=Electronics%20%26%20More&page=1

console.info("== DEMO 18 ==");
const payload = {
  userId: "U123",
  action: "view",
  productId: "P001",
  timestamp: Date.now(),
};
const encoded = encodePayload(payload);
console.log("Encoded:", encoded); // e.g., "eyJ1c2VySWQiOiJVMTIz..."
const decoded = decodePayload(encoded);
console.log("Decoded:", decoded.userId); // "U123"
console.log("Match:", decoded.productId === payload.productId); // true

console.log("== DEMO 19 ==");
const context = { price: 149.99, stock: 30, discount: 0.1 };
console.log(runFormula("price * stock", context)); // 4499.7
console.log(runFormula("price * (1 - discount)", context)); // 134.991
console.log(runFormula("stock > 0 ? 'In Stock' : 'Out of Stock'", context)); // "In Stock"

console.log("╔═══════════════════════════════════╗");
console.log("║   DataForge Pipeline Complete ✅   ║");
console.log("╚═══════════════════════════════════╝");

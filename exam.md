# 🧪 Final Exam — JavaScript Standard Library
### Module by Eko Kurniawan Khannedy
### Issued by: Senior Lead Developer

---

> **TO:** Junior Developer (You)
> **FROM:** Senior Lead Developer
> **SUBJECT:** Task Assignment — `DataForge` Engine v1.0
> **PRIORITY:** 🔴 HIGH — Complete before proceeding to JavaScript Modules
>
> Hey,
>
> Before you move on to the next module, I need you to build something that proves you can actually **use** the JavaScript Standard Library — not just recognize the API names, but apply them to real problems under realistic conditions.
>
> I'm assigning you the `DataForge` project. It's a **mini data processing engine** — the kind of utility pipeline you'll find in almost every backend service, analytics tool, or data-heavy frontend. It reads raw data, validates it, transforms it, indexes it, and exports it in multiple formats.
>
> You'll build this in a **single file: `dataforge.js`**. No external libraries. No npm. Pure JavaScript Standard Library only.
>
> Every section in this spec maps to a specific competency from the module. If you skip a section, you skip a competency — and I'll know.
>
> Read the entire spec before writing a single line. That's not a suggestion.
>
> — Senior Lead Dev

---

## 📋 Competency Coverage Map

Before starting, verify you understand what each section tests:

| Section | Standard Library Competency |
|---|---|
| 1 | Number (static props, static methods, instance methods) |
| 2 | String (instance methods & properties) |
| 3 | Array (forEach, Queue, Stack, Search, Filter, Transform) |
| 4 | Object (freeze, seal, assign, values, property names) |
| 5 | JSON (stringify, parse) |
| 6 | BigInt |
| 7 | Date (creation, epoch/unix, parsing, getters/setters) |
| 8 | Math |
| 9 | Boolean |
| 10 | Map |
| 11 | Set |
| 12 | Symbol |
| 13 | RegExp (exec, test, modifiers, character classes) |
| 14 | RegExp in String (match, search, replace, split) |
| 15 | Proxy |
| 16 | Reflect |
| 17 | Encode (encodeURI, encodeURIComponent, decode variants) |
| 18 | Base64 (btoa, atob) |
| 19 | Eval (with proper caution) |

---

## 🏗️ Project: `DataForge` — Mini Data Processing Engine

DataForge is a data pipeline utility that processes a dataset of **e-commerce product records**. The pipeline runs through several stages: ingestion, validation, transformation, indexing, and export.

Your single file `dataforge.js` should be structured in the order described below. At the bottom of the file, place a **Demo / Test Runner** that exercises every stage of the pipeline.

---

## 📦 The Raw Dataset

At the top of your file, declare the following raw data. This is your input — treat it as data arriving from an external source (hence some values are intentionally messy):

```js
const RAW_PRODUCTS = [
  { id: "P001", name: "  Mechanical Keyboard  ", category: "Electronics", price: "149.99", stock: 30, tags: ["gaming", "keyboard", "rgb"] },
  { id: "P002", name: "ergonomic mouse", category: "Electronics", price: "79.50", stock: 0, tags: ["mouse", "wireless", "ergonomic"] },
  { id: "P003", name: "STANDING DESK", category: "Furniture", price: "599.00", stock: 5, tags: ["desk", "adjustable", "ergonomic"] },
  { id: "P004", name: "usb-c hub", category: "Electronics", price: "not_a_price", stock: 12, tags: ["usb", "hub", "multiport"] },
  { id: "P005", name: "Noise Cancelling Headphones", category: "Electronics", price: "249.99", stock: 18, tags: ["audio", "wireless", "anc"] },
  { id: "P006", name: "laptop stand", category: "Accessories", price: "49.00", stock: 50, tags: ["stand", "ergonomic", "aluminum"] },
  { id: "P007", name: "webcam 4k", category: "Electronics", price: "129.00", stock: 0, tags: ["camera", "4k", "streaming"] },
  { id: "P008", name: "desk lamp", category: "Accessories", price: "35.00", stock: 100, tags: ["lighting", "led", "adjustable"] },
  { id: "P009", name: "MONITOR 27 INCH", category: "Electronics", price: "399.00", stock: 8, tags: ["monitor", "4k", "ips"] },
  { id: "P010", name: "cable organizer", category: "Accessories", price: "12.99", stock: 200, tags: ["cable", "organizer", "desk"] },
];
```

---

## 🔧 Section 1 — Number Utilities (`NumberUtils`)

Create an object called `NumberUtils` with the following methods. This object must be **frozen** after creation (you'll use `Object.freeze()` — that's covered in Section 4, so plan ahead and freeze it there).

### Methods to implement:

**`parsePrice(value)`**
- Converts `value` to a Number using `Number(value)`
- If the result is `NaN`, checked using `Number.isNaN()`, return `0`
- Otherwise return the converted number

**`isValidPrice(value)`**
- Returns `true` if `value` is a finite number greater than `0`
- Use `Number.isFinite()` and `Number.isInteger()` is NOT required here — just check if it's finite and positive

**`formatCurrency(value, locale, currency)`**
- Uses `Number.toLocaleString(locale, { style: 'currency', currency })` to format
- Example: `formatCurrency(149.99, 'en-US', 'USD')` → `"$149.99"`

**`toRadix(value, radix)`**
- Uses `Number.prototype.toString(radix)` to convert a number to a different base representation
- Example: `toRadix(255, 16)` → `"ff"` (hexadecimal)

**`limits()`**
- Returns an object with `min: Number.MIN_VALUE` and `max: Number.MAX_VALUE`

**`checkInteger(value)`**
- Uses `Number.isInteger(value)` to return `true` or `false`

**Demo requirement:**
```js
console.log(NumberUtils.parsePrice("149.99")); // 149.99
console.log(NumberUtils.parsePrice("not_a_price")); // 0
console.log(NumberUtils.isValidPrice(49.00)); // true
console.log(NumberUtils.isValidPrice(0)); // false
console.log(NumberUtils.formatCurrency(149.99, "en-US", "USD")); // $149.99
console.log(NumberUtils.toRadix(255, 16)); // ff
console.log(NumberUtils.limits()); // { min: 5e-324, max: 1.7976931348623157e+308 }
console.log(NumberUtils.checkInteger(30)); // true
console.log(NumberUtils.checkInteger(149.99)); // false
```

---

## 🔤 Section 2 — String Utilities (`StringUtils`)

Create an object called `StringUtils` with the following methods:

**`normalize(str)`**
- Trims whitespace with `.trim()`
- Converts to title case (first letter of each word capitalized, rest lowercase)
- Example: `normalize("  mechanical KEYBOARD  ")` → `"Mechanical Keyboard"`
- Hint: use `.split(" ")`, `.map()`, and string slicing + `.toUpperCase()` + `.toLowerCase()`

**`toSlug(str)`**
- Trims, lowercases, replaces all spaces with `-`
- Example: `toSlug("Mechanical Keyboard")` → `"mechanical-keyboard"`
- Use `.trim()`, `.toLowerCase()`, `.replaceAll(" ", "-")`

**`truncate(str, maxLength)`**
- If `str.length > maxLength`, return first `maxLength` characters + `"..."`
- Otherwise return the string as-is
- Use `.length` property and string `.slice()`

**`countWords(str)`**
- Splits the string by spaces using `.split(" ")` and returns the length
- Use `.split()` and `.length`

**`containsKeyword(str, keyword)`**
- Returns `true` if `str` (lowercased) `.includes()` the keyword (lowercased)
- Use `.toLowerCase()` and `.includes()`

**`extractId(str)`**
- Extracts the numeric part from a product ID string like `"P001"` → `"001"`
- Use `.slice(1)` or `.substring(1)`

**Demo requirement:**
```js
console.log(StringUtils.normalize("  mechanical KEYBOARD  ")); // "Mechanical Keyboard"
console.log(StringUtils.toSlug("Noise Cancelling Headphones")); // "noise-cancelling-headphones"
console.log(StringUtils.truncate("Noise Cancelling Headphones", 10)); // "Noise Canc..."
console.log(StringUtils.countWords("usb c hub multiport")); // 4
console.log(StringUtils.containsKeyword("Ergonomic Mouse", "mouse")); // true
console.log(StringUtils.extractId("P007")); // "007"
```

---

## 📚 Section 3 — Array Pipeline (`ArrayPipeline`)

This is the core transformation stage of DataForge. Implement each function as a standalone exported function (not inside a class or object — just plain functions).

### 3.1 — `normalizeProducts(rawArray)`

Uses `Array.forEach()` to iterate over `rawArray`, normalizes each product using utilities from Sections 1 & 2, and returns a new array of normalized products with the shape:

```js
{
  id: string,          // original id
  name: string,        // normalized (title case, trimmed)
  slug: string,        // toSlug of the normalized name
  category: string,    // original
  price: number,       // parsed via NumberUtils.parsePrice()
  stock: number,       // original
  tags: string[],      // original
  valid: boolean,      // true if price > 0
}
```

> Use `forEach` to build the result array. Do **not** use `.map()` here — the point is to demonstrate `forEach` explicitly.

### 3.2 — Implement a `ProductQueue` class

Using an internal array:
- `enqueue(product)` — adds product to the back (use `.push()`)
- `dequeue()` — removes and returns from the front (use `.shift()`)
- `peek()` — returns front item without removing
- `size()` — returns current length
- `isEmpty()` — returns boolean

This represents the order fulfillment queue — only in-stock products should ever be enqueued.

### 3.3 — Implement a `UndoStack` class

Using an internal array:
- `push(action)` — adds an action string to the top (use `.push()`)
- `pop()` — removes and returns the last action (use `.pop()`)
- `peek()` — returns the top action without removing
- `size()` — returns current length

This represents the undo history for product edits.

### 3.4 — `searchProducts(products, query)` function

Searches the normalized products array using the following:
- `find()` — find the first product whose name **includes** the query (case-insensitive)
- `findIndex()` — find its index
- `includes()` — check if the products array includes the found product
- `indexOf()` — get its index via `indexOf`
- `lastIndexOf()` — check the last occurrence (for thoroughness)

Return an object with all 5 results.

### 3.5 — `filterProducts(products)` function

Returns two arrays using `.filter()`:
- `inStock`: products where `stock > 0`
- `invalid`: products where `valid === false` (bad price)

### 3.6 — `transformProducts(products)` function

Demonstrates all three transform methods:

- `map()` — create a summary array: `{ id, name, formattedPrice }` where `formattedPrice` uses `NumberUtils.formatCurrency(price, "en-US", "USD")`
- `reduce()` — calculate total inventory value: sum of `price * stock` for all valid products
- `reduceRight()` — build a reversed name list: start from the last product and collect names right-to-left

Return all three results.

**Demo requirement:** Call all 6 functions/classes above in the demo, logging meaningful output.

---

## 🔒 Section 4 — Object Operations

### 4.1 — Freeze `NumberUtils`

After defining `NumberUtils` in Section 1, freeze it:
```js
Object.freeze(NumberUtils);
```

Then attempt to add a new property to it and log the result — show that it silently fails (or throws in strict mode).

### 4.2 — Seal a config object

Create a `PIPELINE_CONFIG` object:
```js
const PIPELINE_CONFIG = {
  version: "1.0.0",
  defaultLocale: "en-US",
  defaultCurrency: "USD",
  maxProductNameLength: 50,
};
```

Seal it with `Object.seal(PIPELINE_CONFIG)`.

Demonstrate:
- You CAN modify an existing property (e.g., `version`)
- You CANNOT add a new property (e.g., `debugMode`)
- You CANNOT delete a property

### 4.3 — `Object.assign()` for merging

Create a function `mergeProductUpdate(original, updates)` that uses `Object.assign({}, original, updates)` to create a merged product (non-destructive, returns a new object).

### 4.4 — `Object.values()` and `Object.getOwnPropertyNames()`

Create a function `inspectObject(obj)` that:
- Uses `Object.values(obj)` to log all values
- Uses `Object.getOwnPropertyNames(obj)` to log all property names

Call it on `PIPELINE_CONFIG` in the demo.

---

## 🔄 Section 5 — JSON Processing

### 5.1 — `exportToJSON(products)`

Takes the normalized product array and serializes it using `JSON.stringify(products, null, 2)`. Returns the JSON string.

### 5.2 — `importFromJSON(jsonString)`

Takes a JSON string and deserializes it using `JSON.parse()`. Returns the parsed array.

### 5.3 — Round-trip test

In the demo:
1. Export your normalized products array to JSON
2. Parse it back with `importFromJSON()`
3. Confirm the first product's `name` is the same before and after

---

## 🔢 Section 6 — BigInt for Financial Calculations

The total inventory value of a large warehouse can exceed `Number.MAX_SAFE_INTEGER`. Demonstrate BigInt usage:

### 6.1 — `calculateBigInventory()`

- Create two `BigInt` values representing warehouse quantities: `const warehouseA = 9007199254740991n` and `const warehouseB = 9007199254740991n`
- Add them together: `const total = warehouseA + warehouseB`
- Show the result of `Number.MAX_SAFE_INTEGER` vs the BigInt total
- Demonstrate that you can use `+`, `-`, `*` operators on BigInt
- Show `typeof total` returns `"bigint"`

---

## 📅 Section 7 — Date & Timestamps

### 7.1 — `createTimestamp()`

- Create a date for right now using `new Date()`
- Create a specific date: the product catalog launch date `new Date(2024, 0, 15)` (Jan 15 2024)
- Create a date from a timestamp using `new Date(Date.now())`
- Create a date from string parsing: `Date.parse("2024-06-01T00:00:00.000Z")`

### 7.2 — `formatDate(date)`

Uses the Date getters to return a formatted string:
- `getFullYear()`, `getMonth()` (+1 for human-readable), `getDate()`
- `getHours()`, `getMinutes()`, `getSeconds()`
- Output: `"2024-01-15 09:30:00"` (formatted manually as a string)

### 7.3 — `addDays(date, days)`

- Uses `getTime()` to get the epoch timestamp
- Adds `days * 24 * 60 * 60 * 1000` milliseconds
- Returns a new `Date` object using `new Date(newTimestamp)`

### 7.4 — Demonstrate a date setter

- Create a date, then use `setFullYear()` or `setMonth()` to change it
- Log before and after using `formatDate()`

---

## 📐 Section 8 — Math Operations (`StatEngine`)

Create an object `StatEngine` with:

**`average(numbers)`** — uses `Math.round()` on the result of sum / count

**`clamp(value, min, max)`** — returns `Math.min(Math.max(value, min), max)`

**`randomInt(min, max)`** — uses `Math.random()`, `Math.floor()` to return a random integer in `[min, max]`

**`power(base, exp)`** — uses `Math.pow(base, exp)`

**`squareRoot(value)`** — uses `Math.sqrt(value)`

**`absoluteValue(value)`** — uses `Math.abs(value)`

**`priceStats(products)`** — given an array of valid products, returns:
```js
{
  min: Math.min(...prices),
  max: Math.max(...prices),
  avg: average(prices),
  total: sum via reduce
}
```

**Demo:** Call `priceStats()` on your valid products array.

---

## ✅ Section 9 — Boolean Utility

### 9.1

Create a `BooleanFlag` wrapper class:

```js
class BooleanFlag {
  constructor(value) {
    this._flag = Boolean(value); // explicit Boolean conversion
  }
  toString() {
    return new Boolean(this._flag).toString(); // "true" or "false"
  }
  valueOf() {
    return new Boolean(this._flag).valueOf(); // primitive boolean
  }
  toggle() {
    this._flag = !this._flag;
    return this;
  }
}
```

Demonstrate:
- `new BooleanFlag(1).toString()` → `"true"`
- `new BooleanFlag(0).valueOf()` → `false`
- `new BooleanFlag("").valueOf()` → `false` (empty string is falsy)
- Chaining: `new BooleanFlag(true).toggle().toggle().valueOf()` → `true`

---

## 🗺️ Section 10 — Map: Product Index

### 10.1 — `buildProductMap(products)`

- Creates a `new Map()`
- Uses `forEach()` or iteration to insert each product: `map.set(product.id, product)`
- Returns the map

### 10.2 — Map operations demo

Using the map returned above:
- `.get("P001")` — retrieve a product by ID
- `.has("P999")` — check for non-existent key → `false`
- `.size` — log total count
- `.delete("P010")` — remove a product
- `.forEach((value, key) => ...)` — iterate and log all IDs and names
- `.clear()` on a copy — show the map empties

Show the key difference vs a plain Object: `typeof map.size` (number, not a method you must call).

---

## 🧩 Section 11 — Set: Tag Deduplication

### 11.1 — `extractUniqueTags(products)`

- Iterates over all products
- Collects all tags into a `new Set()`
- Uses `.add()` for each tag
- Returns the set

### 11.2 — Set operations demo

- `.has("ergonomic")` → `true`
- `.has("vr-headset")` → `false`
- `.size` — number of unique tags
- `.delete("led")` — remove a tag
- `forEach(tag => ...)` — iterate and log all unique tags
- Demonstrate that adding a duplicate has no effect (add `"ergonomic"` twice, size stays same)

---

## 🔑 Section 12 — Symbol: Metadata Keys

### 12.1 — Unique Symbol keys

Create symbols for internal metadata that should not clash with regular object keys:

```js
const SYM_CREATED_AT = Symbol("createdAt");
const SYM_SOURCE     = Symbol("source");
const SYM_VERSION    = Symbol("version");
```

Attach them to a product object:
```js
product[SYM_CREATED_AT] = new Date().toISOString();
product[SYM_SOURCE]     = "DataForge-v1";
product[SYM_VERSION]    = "1.0.0";
```

Show that:
- `Object.keys(product)` does NOT include symbol keys (they're hidden from normal enumeration)
- `product[SYM_CREATED_AT]` correctly returns the value

### 12.2 — `Symbol.for()` global registry

```js
const SYM_PIPELINE = Symbol.for("dataforge.pipeline");
const SYM_PIPELINE_REF = Symbol.for("dataforge.pipeline");

console.log(SYM_PIPELINE === SYM_PIPELINE_REF); // true — same symbol from global registry
console.log(Symbol("test") === Symbol("test")); // false — always unique
```

---

## 🔍 Section 13 — RegExp: Validation Engine

Create an object `Validator` with these methods:

**`isValidProductId(id)`**
- Pattern: must be `P` followed by exactly 3 digits → `/^P\d{3}$/`
- Use `.test(id)`
- `"P001"` → `true`, `"P1234"` → `false`, `"A001"` → `false`

**`isValidEmail(email)`**
- Pattern: basic email → `/^[\w.-]+@[\w.-]+\.\w{2,}$/i` (use `i` modifier)
- Use `.test(email)`

**`extractNumbers(str)`**
- Pattern: match all numbers in a string → `/\d+/g` (use `g` modifier)
- Use `regex.exec()` in a `while` loop to extract all matches
- Return an array of matched number strings
- Example: `"P001 costs $149.99 with 30 stock"` → `["001", "149", "99", "30"]`

**`findCategory(str)`**
- Pattern: match `Electronics` or `Furniture` or `Accessories` case-insensitively → `/Electronics|Furniture|Accessories/i`
- Use `.exec(str)` — return the matched string or `null`

**`isMultiline(str)`**
- Pattern: detect if a string spans multiple lines → use the `m` modifier
- Test if the string contains content at the start of any line after the first

**Demo:** Test all 5 validators with real and invalid data.

---

## 🧶 Section 14 — RegExp in String

Create a function `TextProcessor` with these string-regex operations:

**`findAllElectronics(products)`**
- Uses `JSON.stringify(products)` to get a text blob
- Uses `str.match(/P\d{3}/g)` to find all product IDs mentioned
- Returns the array of matches

**`findFirstPriceIndex(str)`**
- Uses `str.search(/\d+\.\d{2}/)` to find the index of the first decimal price in a string
- Returns the index number

**`sanitizeName(name)`**
- Uses `str.replace(/[^a-zA-Z0-9 ]/g, "")` to remove special characters
- Example: `"usb-c hub!!"` → `"usbc hub"`

**`sanitizeAllTags(tags)`**
- Takes an array of tag strings
- Uses `str.replaceAll("-", " ")` on each tag (replaceAll vs replace)
- Returns the cleaned array
- Example: `["usb-c", "noise-cancelling"]` → `["usb c", "noise cancelling"]`

**`parsePriceTokens(str)`**
- Uses `str.split(/\s+/)` to split on any whitespace
- Returns the token array
- Example: `"149.99   30   Electronics"` → `["149.99", "30", "Electronics"]`

---

## 🛡️ Section 15 — Proxy: Schema Guard

Create a `SchemaProxy` that wraps a product object and intercepts all `get` and `set` operations:

### Handler requirements:

**`get` trap:**
- If the property exists, return it
- If the property does NOT exist, instead of returning `undefined`, return `"[MISSING]"`
- Log every get access: `[PROXY GET] property: <name>`

**`set` trap:**
- For `price`: validate that the new value is a positive number. If not, throw a `TypeError`
- For `stock`: validate that it is a non-negative integer. If not, throw a `TypeError`
- All other properties: allow freely
- Log every set: `[PROXY SET] property: <name> = <value>`
- Return `true` after successful set

```js
// Expected usage:
const guarded = new Proxy(product, schemaHandler);
guarded.price = 299.99;    // ✅ logged and set
guarded.price = "cheap";   // ❌ throws TypeError
guarded.stock = -5;         // ❌ throws TypeError
console.log(guarded.nonExistent); // logs [PROXY GET], returns "[MISSING]"
```

---

## 🪞 Section 16 — Reflect: Dynamic Operations

Using `Reflect`, demonstrate the following **without** using direct property access:

**`getProperty(obj, key)`**
- Uses `Reflect.get(obj, key)` instead of `obj[key]`

**`setProperty(obj, key, value)`**
- Uses `Reflect.set(obj, key, value)` instead of `obj[key] = value`
- Returns the boolean result

**`hasProperty(obj, key)`**
- Uses `Reflect.has(obj, key)` instead of `key in obj`

**`deleteProperty(obj, key)`**
- Uses `Reflect.deleteProperty(obj, key)` instead of `delete obj[key]`

**`listKeys(obj)`**
- Uses `Reflect.ownKeys(obj)` which returns ALL own keys including symbols

**Demo:** Use all 5 on a product object from the normalized array. Show that `Reflect.ownKeys()` includes the Symbol keys you attached in Section 12.

---

## 🔗 Section 17 — Encode: URL Builder

Create a function `buildApiUrl(baseUrl, endpoint, params)`:

```js
// params is an object like: { query: "mechanical keyboard", category: "Electronics & More", page: 1 }
// Expected output: "https://api.dataforge.io/products?query=mechanical%20keyboard&category=Electronics%20%26%20More&page=1"
```

**Implementation requirements:**
- Use `encodeURI(baseUrl + endpoint)` to encode the base part (reserved chars stay intact)
- Use `encodeURIComponent(key)` and `encodeURIComponent(value)` for each query parameter
- Combine them with `Object.entries(params).map(...).join("&")`
- Append with `?`

Also demonstrate `decodeURI()` and `decodeURIComponent()` on the encoded URL and a single encoded component.

**Show the difference:**
```js
encodeURI("https://api.io?name=a&b=c")      // keeps & and = intact
encodeURIComponent("name=a&b=c")             // encodes & and = as %3D, %26
```

---

## 🔐 Section 18 — Base64: Payload Encoding

Create two functions:

**`encodePayload(obj)`**
- `JSON.stringify(obj)` first
- Then `btoa(jsonString)` to encode to Base64
- Return the Base64 string

**`decodePayload(base64String)`**
- `atob(base64String)` to decode
- Then `JSON.parse()` to get the object back
- Return the object

**Demo:**
```js
const payload = { userId: "U123", action: "view", productId: "P001", timestamp: Date.now() };
const encoded = encodePayload(payload);
console.log("Encoded:", encoded); // e.g., "eyJ1c2VySWQiOiJVMTIz..."
const decoded = decodePayload(encoded);
console.log("Decoded:", decoded.userId); // "U123"
console.log("Match:", decoded.productId === payload.productId); // true
```

---

## ⚡ Section 19 — Eval: Dynamic Formula Engine

> ⚠️ **Security Note from Senior Lead Dev:**
> `eval()` is powerful but dangerous. In a real production system, you would **never** eval user-supplied input — it opens the door to code injection attacks. Here we use it only in a fully controlled, sandboxed context where the formula string is generated by the system itself, never by user input. You are expected to demonstrate awareness of this in a comment in your code.

Create a function `runFormula(formula, context)`:

- `formula` is a string like `"price * stock"` — the variables come from `context`
- Build a safe executor by injecting context values into the formula manually:

```js
function runFormula(formula, context) {
  // ⚠️ eval is used here only with system-generated strings, never user input
  const keys = Object.keys(context);
  const values = Object.values(context);
  const fn = new Function(...keys, `return ${formula}`);
  return fn(...values);
}
```

> Note: Using `new Function(...)` is slightly safer than raw `eval()` because it runs in its own scope, but carry the same caution. Both `eval` and `new Function` fall under this competency.

**Demo:**
```js
const context = { price: 149.99, stock: 30, discount: 0.1 };
console.log(runFormula("price * stock", context)); // 4499.7
console.log(runFormula("price * (1 - discount)", context)); // 134.991
console.log(runFormula("stock > 0 ? 'In Stock' : 'Out of Stock'", context)); // "In Stock"
```

---

## 🎬 Section 20 — Demo / Test Runner

At the **bottom of `dataforge.js`**, write a sequential test runner that calls every section in order. Structure it like this:

```js
console.log("╔═══════════════════════════════════╗");
console.log("║      DataForge Engine v1.0        ║");
console.log("╚═══════════════════════════════════╝");

// --- STAGE 1: RAW DATA INGESTION ---
// ... normalize all products via normalizeProducts(RAW_PRODUCTS)

// --- STAGE 2: NUMBER UTILITIES ---
// ... demo all NumberUtils methods

// --- STAGE 3: STRING UTILITIES ---
// ... demo all StringUtils methods

// --- STAGE 4: ARRAY PIPELINE ---
// ... queue demo, stack demo, search, filter, transform

// --- STAGE 5: OBJECT OPERATIONS ---
// ... freeze test, seal test, assign, values, property names

// --- STAGE 6: JSON ---
// ... export, import, round-trip test

// --- STAGE 7: BIGINT ---
// ... big warehouse calculation

// --- STAGE 8: DATE ---
// ... timestamps, formatting, adding days

// --- STAGE 9: MATH ---
// ... StatEngine.priceStats() on valid products

// --- STAGE 10: BOOLEAN ---
// ... BooleanFlag demo

// --- STAGE 11: MAP ---
// ... buildProductMap, all map operations

// --- STAGE 12: SET ---
// ... extractUniqueTags, all set operations

// --- STAGE 13: SYMBOL ---
// ... symbol keys, Symbol.for()

// --- STAGE 14: REGEXP ---
// ... Validator — all 5 methods

// --- STAGE 15: REGEXP IN STRING ---
// ... TextProcessor — all 5 methods

// --- STAGE 16: PROXY ---
// ... SchemaProxy — valid and invalid sets

// --- STAGE 17: REFLECT ---
// ... all 5 Reflect operations

// --- STAGE 18: ENCODE ---
// ... buildApiUrl, decode demo

// --- STAGE 19: BASE64 ---
// ... encodePayload, decodePayload, round-trip

// --- STAGE 20: EVAL ---
// ... runFormula — 3 formulas

console.log("╔═══════════════════════════════════╗");
console.log("║   DataForge Pipeline Complete ✅   ║");
console.log("╚═══════════════════════════════════╝");
```

---

## ⏱️ Time Estimate

| Section | Estimated Time |
|---|---|
| Section 1 — Number | 15 min |
| Section 2 — String | 20 min |
| Section 3 — Array | 40 min |
| Section 4 — Object | 15 min |
| Section 5 — JSON | 10 min |
| Section 6 — BigInt | 10 min |
| Section 7 — Date | 20 min |
| Section 8 — Math | 15 min |
| Section 9 — Boolean | 10 min |
| Section 10 — Map | 15 min |
| Section 11 — Set | 10 min |
| Section 12 — Symbol | 15 min |
| Section 13 — RegExp | 25 min |
| Section 14 — RegExp in String | 20 min |
| Section 15 — Proxy | 20 min |
| Section 16 — Reflect | 15 min |
| Section 17 — Encode | 15 min |
| Section 18 — Base64 | 10 min |
| Section 19 — Eval | 15 min |
| Section 20 — Demo | 20 min |
| **Total** | **~4.5 hours** |

---

## 📐 Code Quality Requirements

- ✅ File runs cleanly with `node dataforge.js` — zero crashes
- ✅ Every section is clearly commented with the section number
- ✅ Every Standard Library API listed in the competency map is used at least once
- ✅ The `eval` / `new Function` section includes a security warning comment
- ✅ `NumberUtils` must be verifiably frozen (attempted mutation should be logged)
- ✅ `PIPELINE_CONFIG` must be verifiably sealed
- ✅ `SchemaProxy` must throw on invalid price and stock values
- ✅ All RegExp patterns use the appropriate flags (`i`, `g`, `m`) where relevant
- ✅ The entire demo runner flows sequentially, using the same normalized product data throughout

---

## 🧾 Submission

Submit a single file: **`dataforge.js`**

Self-check before submitting:

```
□ Does `node dataforge.js` run without any uncaught errors?
□ Is every section implemented (1–19 + demo)?
□ Is NumberUtils frozen and the freeze tested?
□ Is PIPELINE_CONFIG sealed and the seal tested?
□ Does the Proxy throw TypeError on invalid price/stock?
□ Does the RegExp extractNumbers() use exec() in a while loop?
□ Does the Iterator/Symbol.iterator in Party still hold from your OOP knowledge?
□ Does Reflect.ownKeys() show symbol keys from Section 12?
□ Does the Base64 round-trip decode back to the original object?
□ Is there a security comment in the eval section?
```

---

## 🏆 Grading Rubric

| Section | Points |
|---|---|
| Section 1 — Number | 5 |
| Section 2 — String | 5 |
| Section 3 — Array (all 6 parts) | 15 |
| Section 4 — Object | 8 |
| Section 5 — JSON | 5 |
| Section 6 — BigInt | 4 |
| Section 7 — Date | 7 |
| Section 8 — Math | 6 |
| Section 9 — Boolean | 4 |
| Section 10 — Map | 6 |
| Section 11 — Set | 5 |
| Section 12 — Symbol | 6 |
| Section 13 — RegExp | 8 |
| Section 14 — RegExp in String | 7 |
| Section 15 — Proxy | 7 |
| Section 16 — Reflect | 6 |
| Section 17 — Encode | 4 |
| Section 18 — Base64 | 4 |
| Section 19 — Eval | 3 |
| Demo completeness & code quality | **+5 Bonus** |
| **Total** | **115 (+5 bonus)** |

*Scores are normalized to 100 after grading. The bonus 5 points are extra.*

---

> **Final note from your Senior Lead Dev:**
>
> This isn't a toy project. Every single utility in `DataForge` maps to something you'll write in a real job — currency formatters, slug generators, search functions, JSON round-trips, date handlers, URL builders, schema validators, proxy interceptors.
>
> The engineers who stand out aren't the ones who memorize MDN docs. They're the ones who know *when* to reach for `Set` vs `Array`, *why* `Map` beats `Object` for dynamic keys, and *what* risks `eval` carries before they type it.
>
> Build it clean. Build it complete. Run `node dataforge.js` until it's silent and green.
>
> — Senior Lead Dev 🚀

---

*Exam created for the JavaScript Standard Library module.*
*By Eko Kurniawan Khannedy | Programmer Zaman Now*

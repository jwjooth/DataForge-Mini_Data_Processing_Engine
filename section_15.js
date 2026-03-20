export const schemaHandler = {
  get(target, prop) {
    console.log(`[PROXY GET] property: ${String(prop)}`);

    if (prop in target) {
      return target[prop];
    }

    return "[MISSING]";
  },

  set(target, prop, value) {
    console.log(`[PROXY SET] property: ${String(prop)} = ${value}`);

    if (prop === "price") {
      if (typeof value !== "number" || value <= 0) {
        throw new TypeError("Price must be a positive number");
      }
    }

    if (prop === "stock") {
      if (!Number.isInteger(value) || value < 0) {
        throw new TypeError("Stock must be a non-negative integer");
      }
    }

    target[prop] = value;
    return true;
  }
};
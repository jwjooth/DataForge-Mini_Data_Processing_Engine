export const StatEngine = {
  average(numbers) {
    let total = 0;
    for (const number of numbers) {
      total += number;
    }
    return Math.round(total / numbers.length);
  },
  clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  power(base, exp) {
    return Math.pow(base, exp);
  },
  squareRoot(value) {
    return Math.sqrt(value);
  },
  absoluteValue(value) {
    return Math.abs(value);
  },
  priceStats(products) {
    const prices = products
      .map((p) => Number(p.price))
      .filter((p) => !Number.isNaN(p) && p > 0);
    if (prices.length === 0) {
      return { min: 0, max: 0, avg: 0, total: 0 };
    }
    const total = prices.reduce((sum, acc) => sum + acc, 0);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: this.average(prices),
      total,
    };
  },
};

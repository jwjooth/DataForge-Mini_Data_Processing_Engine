export function runFormula(formula, context) {
  const keys = Object.keys(context);
  const values = Object.values(context);
  const fn = new Function(...keys, `return ${formula}`);
  return fn(...values);
}

export function calculateBigInventory() {
  const warehouseA = 9007199254740991n;
  const warehouseB = 9007199254740991n;
  return (
    BigInt(warehouseA + warehouseB) + typeof BigInt(warehouseA + warehouseB)
  );
}


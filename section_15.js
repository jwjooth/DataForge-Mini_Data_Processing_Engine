function SchemaProxy() {
  let price;
  let stock;
  function set(price) {
    this.price = price;
  }
  function get() {

  }
  return (price, stock, set, get);
}
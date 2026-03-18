function SchemaProxy() {
  let price;
  let stock;
  function set(price) {
    if(price > 0){

    } else {
      throw new TypeError();
    }
  }
  function get() {
    if(undefined){

    } else {

    }
  }
  return (price, stock, set, get);
}
export class BooleanFlag {
  constructor(value) {
    this._flag = Boolean(value);
  }
  toString() {
    return new Boolean(this._flag).toString();
  }
  valueOf() {
    return new Boolean(this._flag).valueOf();
  }
  toggle() {
    this._flag = !this._flag;
    return this;
  }
} 
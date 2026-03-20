export const ReflectUtils = {
  getProperty(obj, key) {
    return Reflect.get(obj, key);
  },

  setProperty(obj, key, value) {
    return Reflect.set(obj, key, value);
  },

  hasProperty(obj, key) {
    return Reflect.has(obj, key);
  },

  deleteProperty(obj, key) {
    return Reflect.deleteProperty(obj, key);
  },

  listKeys(obj) {
    return Reflect.ownKeys(obj);
  }
};
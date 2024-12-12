class LocalStorage {
  constructor() {}

  static getItem(key) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
      //   return JSON.parse(localStorage.getItem(key));
    }
    return null;
  }

  static setItem(key, item) {
    if (typeof window !== 'undefined') {
      // localStorage.setItem(key, JSON.stringify(item));
      localStorage.setItem(key, item);
    }
  }

  static removeItem(key) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

export default LocalStorage;

function setLocalStorage<T>(key: string, value: T) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage<T>(key: string, defaultValue: T) {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  } catch (e) {
    return String(defaultValue);
  }
}

export { setLocalStorage, getLocalStorage };

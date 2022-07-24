function setLocalStorage<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage<T>(key: string, initialValue: T) {
    try {
        const value = window.localStorage.getItem(key);
        return value ? JSON.parse(value) : initialValue;
    } catch (e) {
        return String(initialValue);
    }
}

export {setLocalStorage, getLocalStorage};

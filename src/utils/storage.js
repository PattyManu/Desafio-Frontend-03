export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function getItem(key) {
  return localStorage.getItem(key);
}

export function clear() {
  localStorage.clear();
}

export function removeItem(key) {
  localStorage.removeItem(key);
}
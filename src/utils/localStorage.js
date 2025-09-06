// utils/localStorage.js
export function loadData(key, fallback) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

export function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

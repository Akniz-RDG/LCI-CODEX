const clone = (value) => {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
};

const parse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : clone(fallback);
  } catch (error) {
    console.warn('No se pudo leer localStorage', error);
    return clone(fallback);
  }
};

export const load = (key, fallback = []) => parse(localStorage.getItem(key), fallback);

export const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

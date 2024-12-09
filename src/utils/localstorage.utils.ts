export const setLocalstorageKey = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const deleteLocalstorageKey = (key: string) => {
  localStorage.removeItem(key);
};

export const getLocalstorageKey = (key: string) => {
  return localStorage.getItem(key);
};

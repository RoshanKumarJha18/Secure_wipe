const COUNT_KEY = "wipeCount";

export const getCount = () => {
  return parseInt(localStorage.getItem(COUNT_KEY) || "0", 10);
};

export const incrementCount = () => {
  const newCount = getCount() + 1;
  localStorage.setItem(COUNT_KEY, newCount);
  // Dispatch a custom event that other components can listen to.
  window.dispatchEvent(new CustomEvent('storage_updated'));
  return newCount;
};
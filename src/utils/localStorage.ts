export const getLocalStorageState = <T>(
  nameItem: string,
  defaultValue: T
): T | null => {
  let state = null;

  try {
    const storedData: string | null = window.localStorage.getItem(nameItem);

    if (storedData) {
      state = { ...JSON.parse(storedData) };
    } else {
      state = defaultValue;
    }
  } catch (err) {
    console.error(err);
  } finally {
    return state;
  }
};

export const setLocalStorageState = <T>(nameItem: string, value: T) => {
  window.localStorage.setItem(nameItem, JSON.stringify(value));
};

import { getStorage, parseStorageValue, validateData } from './storage.utils';

import type { GetStorageData, SetStorageData } from './storage.types';

export const setStorageData: SetStorageData = (key, data) => {
  const storage = getStorage();
  try {
    storage?.setItem(key, JSON.stringify(data));
  } catch {}
};

export const getStorageData: GetStorageData = (key, validationSchema, defaultValue) => {
  const storage = getStorage();
  try {
    const storageValue = storage?.getItem(key);

    if (!storageValue) {
      return defaultValue;
    }

    const data = parseStorageValue(storageValue);
    const validatedData = validateData(data, validationSchema);

    return validatedData ?? defaultValue;
  } catch {
    return defaultValue;
  }
};

export const removeStorageData = (key: string) => {
  const storage = getStorage();
  try {
    storage?.removeItem(key);
  } catch {}
};

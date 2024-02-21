import type { SetStorageData, GetStorageData } from './storage.types';

export const setStorageData: SetStorageData = (key, data) => {
  const storage = window?.localStorage;

  storage?.setItem(key, JSON.stringify(data));
};

export const getStorageData: GetStorageData = (key, validationSchema, defaultValue) => {
  const storage = window?.localStorage;

  const storageValue = storage.getItem(key);

  if (!storageValue) {
    return defaultValue;
  }

  const data: unknown = JSON.parse(storageValue);

  const validationResult = validationSchema.safeParse(data);

  if (!validationResult.success) {
    return defaultValue;
  }

  return validationResult.data;
};

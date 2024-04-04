import { getStorageData, setStorageData } from 'utils/storage';

import { CONNECTED_DEVICES_STORAGE_KEY } from './connectedDevices.config';
import { ConnectedDevicesValidationSchema } from './connectedDevices.schema';

import type { ConnectedDevice } from './connectedDevices.types';

export const loadConnectedDevices = (): ConnectedDevice[] => {
  const devices: ConnectedDevice[] = getStorageData(
    CONNECTED_DEVICES_STORAGE_KEY,
    ConnectedDevicesValidationSchema,
    [],
  );

  return devices;
};

export const saveConnectedDevices = (devices: ConnectedDevice[]) => {
  setStorageData(
    CONNECTED_DEVICES_STORAGE_KEY,
    devices.map(({ url, label }) => ({ url, label })),
  );
};

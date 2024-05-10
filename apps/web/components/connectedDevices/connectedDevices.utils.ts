import { getStorageData, setStorageData } from 'utils/storage';
import { parseSafeConnectionResponseData } from 'config/connections';

import { CONNECTED_DEVICES_STORAGE_KEY, CONNECTED_DEVICE_API_URL } from './connectedDevices.config';
import { ConnectedDevicesValidationSchema } from './connectedDevices.schema';

import type { ConnectionResponseData } from 'config/connections.types';
import type { ConnectedDevice } from './connectedDevices.types';

export const isIPAddress = (value: string) => {
  const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

  return ipRegex.test(value);
};

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

export const updateConnectedDevicesList = (devices: ConnectedDevice[], device: ConnectedDevice) => {
  let deviceExists = false;

  const updatedDevices = devices.map((d) => {
    if (d.url === device.url) {
      deviceExists = true;
      return { ...d, ...device };
    }

    return d;
  });

  if (!deviceExists) {
    updatedDevices.push(device);
  }

  return updatedDevices;
};

export const progressPercentage = (index: number, current: number, max: number) =>
  Math.ceil((100 * (current + index + 1)) / (max || 1));

export const postConnectedDeviceData = async (
  url: string,
  body: string,
): Promise<ConnectionResponseData | undefined> => {
  try {
    const responseData = await fetch(CONNECTED_DEVICE_API_URL(url), {
      method: 'POST',
      body,
    });

    const data = await responseData.text();
    return parseSafeConnectionResponseData(data);
  } catch {}

  return undefined;
};

export const getConnectedDeviceData = async (
  url: string,
): Promise<ConnectionResponseData | undefined> => {
  try {
    const responseData = await fetch(CONNECTED_DEVICE_API_URL(url), {
      method: 'GET',
    });

    const data = await responseData.text();
    return parseSafeConnectionResponseData(data);
  } catch {}

  return undefined;
};

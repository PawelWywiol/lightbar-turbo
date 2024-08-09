import { getStorageData, removeStorageData, setStorageData } from 'utils/storage';

import { CONNECTED_DEVICES_STORAGE_KEY, CONNECTED_DEVICE_API_URL } from './devices.config';
import {
  ConnectedDeviceUrlValidationSchema,
  ConnectedDevicesValidationSchema,
} from './devices.schema';

import type { ConnectedDevice } from './devices.types';
import { parseSafeConnectionResponseData } from '../connections/connections.utils';
import { ConnectionResponseData } from '../connections/connections.types';
import { LightsFrame, LightsScheme } from '../lights/lights.types';

export const isIPAddress = (value: string) => {
  const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

  return ipRegex.test(value);
};

export const loadConnectedDevices = (): ConnectedDevice[] => {
  const devices: ConnectedDevice[] = getStorageData(
    CONNECTED_DEVICES_STORAGE_KEY('devices'),
    ConnectedDevicesValidationSchema,
    [],
  );

  return devices;
};

export const saveConnectedDevices = (devices: ConnectedDevice[]) => {
  setStorageData(
    CONNECTED_DEVICES_STORAGE_KEY('devices'),
    devices.map(({ url, label }) => ({ url, label })),
  );
};

export const loadLastSelectedDeviceUrl = (): string | undefined =>
  getStorageData(
    CONNECTED_DEVICES_STORAGE_KEY('selected'),
    ConnectedDeviceUrlValidationSchema,
    undefined,
  );

export const saveLastSelectedDeviceUrl = (url: string) => {
  if (ConnectedDeviceUrlValidationSchema.safeParse(url).success) {
    setStorageData(CONNECTED_DEVICES_STORAGE_KEY('selected'), url);
  } else {
    removeStorageData(CONNECTED_DEVICES_STORAGE_KEY('selected'));
  }
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

export const resolveFrameColorIndexes = (frame: LightsFrame, size: number): LightsFrame => ({
  ...frame,
  colorIndexes: [
    ...frame.colorIndexes,
    ...(Array.from({ length: size - frame.colorIndexes.length }).fill(0) as number[]),
  ].slice(0, size),
});

export const resolveLightsSchemeColorIndexes = (
  scheme: LightsScheme,
  size: number,
): LightsScheme => ({
  ...scheme,
  frames: scheme.frames.map((frame) => resolveFrameColorIndexes(frame, size)),
});

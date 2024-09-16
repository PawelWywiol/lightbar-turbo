import { getStorageData, removeStorageData, setStorageData } from 'utils/storage';

import { isConnectionResponseData } from '../connections/connections.utils';

import {
  CONNECTED_DEVICES_STORAGE_KEY,
  CONNECTED_DEVICE_API_DEFAULT_PATH,
  CONNECTED_DEVICE_API_DEFAULT_SCHEMA,
} from './devices.config';
import {
  ConnectedDeviceUrlValidationSchema,
  ConnectedDevicesValidationSchema,
} from './devices.schema';

import type { ConnectedDevice } from './devices.types';
import type { ConnectionResponseData } from '../connections/connections.types';
import type { LightsFrame, LightsScheme } from '../lights/lights.types';

export const isIPAddress = (value: string) => {
  const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$/;

  return ipRegex.test(value);
};

export const isUrl = (value: string) => {
  const urlRegex = /^(http|https):\/\//;

  return urlRegex.test(value);
};

export const resolveConnectedDeviceApiUrl = (
  url: string,
  schema: string = CONNECTED_DEVICE_API_DEFAULT_SCHEMA,
  path: string = CONNECTED_DEVICE_API_DEFAULT_PATH,
): string => {
  if (isIPAddress(url)) {
    return `${schema}://${url}${path}`;
  }

  return isUrl(url) ? url : `${schema}://${url}${path}`;
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
    const responseData = await fetch(resolveConnectedDeviceApiUrl(url), {
      method: 'GET',
    });

    const responsJson = (await responseData.json()) as unknown;

    return isConnectionResponseData(responsJson) ? responsJson : undefined;
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

import { Device, DeviceSizeOptions } from './devices.types';

export const CONNECTED_DEVICES_STORAGE_KEY = (type: 'devices' | 'selected') =>
  `connectedDevices:${type}`;
export const CONNECTED_DEVICE_API_PATH = '/api';
export const CONNECTED_DEVICE_API_URL = (url?: string) =>
  url ? `http://${url}${CONNECTED_DEVICE_API_PATH}` : CONNECTED_DEVICE_API_PATH;
export const CONNECTED_DEVICE_GET_STATE_INTERVAL = 30_000;
export const CONNECTED_DEVICES_MAX_COUNT = 255;

export const SUBNETS_IPS = [
  '10.0.0.1',
  '10.0.0.138',
  '10.0.0.2',
  '10.0.1.1',
  '10.1.1.1',
  '10.1.10.1',
  '10.10.1.1',
  '10.90.90.90',
  '192.168.100.1',
  '192.168.0.1',
  '192.168.0.10',
  '192.168.0.100',
  '192.168.0.101',
  '192.168.0.227',
  '192.168.0.254',
  '192.168.0.3',
  '192.168.0.30',
  '192.168.0.50',
  '192.168.1.10',
  '192.168.1.100',
  '192.168.1.20',
  '192.168.1.200',
  '192.168.1.210',
  '192.168.1.254',
  '192.168.1.99',
  '192.168.10.10',
  '192.168.10.100',
  '192.168.10.50',
  '192.168.100.100',
  '192.168.123.254',
  '192.168.168.168',
  '192.168.2.254',
  '192.168.223.100',
  '192.168.254.254',
  '200.200.200.5',
];

export const DEVICE_SIZES: DeviceSizeOptions = [
  {
    value: 8,
    label: '8 leds',
    grid: {
      rows: 1,
      columns: 8,
    },
  },
  {
    value: 16,
    label: '16 leds',
    grid: {
      rows: 2,
      columns: 8,
    },
  },
  {
    value: 64,
    label: '64 leds',
    grid: {
      rows: 8,
      columns: 8,
    },
  },
  {
    value: 100,
    label: '100 leds',
    grid: {
      rows: 10,
      columns: 10,
    },
  },
];

export const DEFAULT_DEVICE_SIZE = DEVICE_SIZES[2] ?? DEVICE_SIZES[0];

export const DEFAULT_DEVICE: Device = {
  size: DEFAULT_DEVICE_SIZE,
};

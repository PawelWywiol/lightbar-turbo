import type { Device, DeviceSizeOptions } from './devices.types';

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

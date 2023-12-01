export interface DeviceSizeOption {
  value: number;
  label: string;
  grid: {
    rows: number;
    columns: number;
  };
}

export type DeviceSizeOptions = [DeviceSizeOption, ...DeviceSizeOption[]];

export interface Device {
  size: DeviceSizeOption;
}

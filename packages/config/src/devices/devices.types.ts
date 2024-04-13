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

export type DeviceCustomEventName = 'app:device:selected' | 'app:device:updated';

export type DeviceCustomEventDispatch =
  | {
      name:  'app:device:selected';
      detail: string;
    }
  | {
      name:  'app:device:updated';
      detail: Device;
    };

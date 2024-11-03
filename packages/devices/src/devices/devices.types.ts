import type { ConnectionResponseData, ConnectionType } from '../connections/connections.types';
import type { LightsScheme } from '../lights/lights.types';

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

export type DeviceCustomEventDispatch =
  | {
      name: 'app:device:selected';
      detail: string | undefined;
    }
  | {
      name: 'app:device:updated';
      detail: Device;
    };

export interface ConnectedDevice {
  url: string;
  label?: string | undefined;
  status?: ConnectionType | undefined;
  info?: ConnectionResponseData | undefined;
}

export interface EditorSchemeUpdateEvent {
  name: 'app:editor:scheme:update';
  detail: {
    scheme: LightsScheme;
    frameIndex: number;
  };
}

export interface EditorColorUpdateEvent {
  name: 'app:editor:color:update';
  detail: string | undefined;
}

export interface EditorSchemeSaveEvent {
  name: 'app:editor:scheme:save';
  detail: {
    uid: string;
    scheme: LightsScheme;
  };
}

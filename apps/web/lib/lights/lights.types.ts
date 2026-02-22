import type { LightsFrame, LightsFrameType } from 'devices/lights.types';

export type { LightColor, LightsFrame, LightsFrameType } from 'devices/lights.types';
export { lightsFrameType } from 'devices/lights.types';

export interface LightsLayoutOption {
  value: number;
  label: string;
  grid: {
    rows: number;
    columns: number;
  };
}

export type LightsLayoutOptions = [LightsLayoutOption, ...LightsLayoutOption[]];

export interface LightsFrameTypeOption {
  value: LightsFrameType;
  label: string;
}

export interface LightsFrameTempoOption {
  value: string;
  label: string;
}

export interface LightsScheme {
  name: string;
  frames: LightsFrame[];
}

export interface LightsSchemeData {
  uid: string;
  scheme: LightsScheme;
  updatedAt: string;
}

export type LightsSchemeDataArray = LightsSchemeData[];

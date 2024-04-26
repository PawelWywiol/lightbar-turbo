export const lightsFrameType = {
  step: 0,
  fade: 1,
} as const;

export type LightsFrameType = (typeof lightsFrameType)[keyof typeof lightsFrameType];

export interface LightsFrameTypeOption {
  value: LightsFrameType;
  label: string;
}

export interface LightsFrameTempoOption {
  value: string;
  label: string;
}

export interface LightsFrame {
  type: LightsFrameType;
  tempo: number;
  colorIndexes: number[];
}

export interface LightsScheme {
  name: string;
  colors: string[];
  frames: LightsFrame[];
}

export interface LightsSchemeData {
  uid: string;
  scheme: LightsScheme;
  updatedAt: string;
}

export type LightsSchemeDataArray = LightsSchemeData[];

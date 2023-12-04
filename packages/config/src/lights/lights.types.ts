export type LightsFrameType = 'step' | 'fade';

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
  uid: string;
  name: string;
  colors: string[];
  frames: LightsFrame[];
}

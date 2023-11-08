export interface LightsSizeOption {
  value: number;
  label: string;
}

export type LightsFrameType = 'step' | 'fade';

export interface LightsFrame {
  index: number;
  type: LightsFrameType;
  tempo: number;
  colorIndexes: number[];
}

export interface LightsScheme {
  size: number;
  colors: string[];
  frames: LightsFrame[];
}

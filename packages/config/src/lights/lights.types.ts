export interface LightsFrameSizeOption {
  value: number;
  label: string;
  grid: {
    rows: number;
    columns: number;
  };
}

export type LightsFrameSizeOptions = [LightsFrameSizeOption, ...LightsFrameSizeOption[]];

export type LightsFrameType = 'step' | 'fade';

export interface LightsFrame {
  index: number;
  type: LightsFrameType;
  tempo: number;
  colorIndexes: number[];
}

export interface LightsScheme {
  size: LightsFrameSizeOption;
  colors: string[];
  frames: LightsFrame[];
  frameIndex: number;
}

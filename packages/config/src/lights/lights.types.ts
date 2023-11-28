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
  size: LightsFrameSizeOption;
  colors: string[];
  frames: LightsFrame[];
}

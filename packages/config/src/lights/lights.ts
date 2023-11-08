import type {
  LightsFrame,
  LightsFrameType,
  LightsScheme,
  LightsFrameSizeOptions,
} from './lights.types';

export const LIGHTS_FRAME_SIZES: LightsFrameSizeOptions = [
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
];

export const DEFAULT_LIGHTS_FRAME_TEMPO = 128;
export const DEFAULT_LIGHTS_FRAME_TYPE: LightsFrameType = 'step';
export const DEFAULT_LIGHTS_FRAME: LightsFrame = {
  index: 0,
  type: DEFAULT_LIGHTS_FRAME_TYPE,
  tempo: DEFAULT_LIGHTS_FRAME_TEMPO,
  colorIndexes: [],
};
export const DEFAULT_LIGHTS_SCHEME_SIZE = LIGHTS_FRAME_SIZES[0];
export const DEFAULT_LIGHTS_SCHEME_COLORS = ['#000000'];

export const DEFAULT_LIGHTS_SCHEME: LightsScheme = {
  size: DEFAULT_LIGHTS_SCHEME_SIZE,
  colors: DEFAULT_LIGHTS_SCHEME_COLORS,
  frames: [DEFAULT_LIGHTS_FRAME],
  frameIndex: 0,
};

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
export const DEFAULT_LIGHTS_SCHEME_COLORS = ['#000000', '#ff0000', '#00ff00', '#0000ff'];

export const DEFAULT_LIGHTS_SCHEME: LightsScheme = {
  size: DEFAULT_LIGHTS_SCHEME_SIZE,
  colors: DEFAULT_LIGHTS_SCHEME_COLORS,
  frames: [
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 0,
      colorIndexes: [0, 1, 2, 3, 0, 1, 2, 3],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 1,
      colorIndexes: [1, 2, 3, 0, 1, 2, 3, 0],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 2,
      colorIndexes: [2, 3, 0, 1, 2, 3, 0, 1],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 3,
      colorIndexes: [3, 0, 1, 2, 3, 0, 1, 2],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 4,
      colorIndexes: [0, 0, 0, 0, 1, 1, 1, 1],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 5,
      colorIndexes: [1, 1, 1, 1, 2, 2, 2, 2],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 6,
      colorIndexes: [2, 2, 2, 2, 3, 3, 3, 3],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 7,
      colorIndexes: [3, 3, 3, 3, 0, 0, 0, 0],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 8,
      colorIndexes: [0, 0, 0, 0, 0, 0, 0, 0],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 9,
      colorIndexes: [1, 1, 1, 1, 1, 1, 1, 1],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 10,
      colorIndexes: [2, 2, 2, 2, 2, 2, 2, 2],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      index: 11,
      colorIndexes: [3, 3, 3, 3, 3, 3, 3, 3],
    },
  ],
  frameIndex: 0,
};

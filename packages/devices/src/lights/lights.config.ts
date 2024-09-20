import type {
  LightsFrame,
  LightsFrameType,
  LightsFrameTypeOption,
  LightsScheme,
  LightsFrameTempoOption,
} from './lights.types';

export const LIGHTS_SCHEME_NAME_MAX_LENGTH = 16;

export const LIGHTS_FRAME_TYPES: LightsFrameTypeOption[] = [
  {
    value: 0,
    label: 'Step',
  },
  {
    value: 1,
    label: 'Fade',
  },
];

export const LIGHTS_FRAME_TEMPO_OPTIONS: LightsFrameTempoOption[] = [
  {
    value: '255',
    label: '83 ms',
  },
  {
    value: '240',
    label: '250 ms',
  },
  {
    value: '120',
    label: '500 ms',
  },
  {
    value: '80',
    label: '750 ms',
  },
  {
    value: '60',
    label: '1.00 sec',
  },
  {
    value: '48',
    label: '1.25 sec',
  },
  {
    value: '32',
    label: '1.87 sec',
  },
  {
    value: '16',
    label: '3.75 sec',
  },
  {
    value: '8',
    label: '7.50 sec',
  },
  {
    value: '4',
    label: '15 sec',
  },
  {
    value: '3',
    label: '20 sec',
  },
  {
    value: '2',
    label: '30 sec',
  },
  {
    value: '1',
    label: '1 min',
  },
];

export const DEFAULT_LIGHTS_FRAME_TEMPO = 120;
export const DEFAULT_LIGHTS_FRAME_TYPE: LightsFrameType = 0;
export const DEFAULT_LIGHTS_FRAME: LightsFrame = {
  type: DEFAULT_LIGHTS_FRAME_TYPE,
  tempo: DEFAULT_LIGHTS_FRAME_TEMPO,
  colorIndexes: [],
};

export const DEFAULT_LIGHTS_SCHEME: LightsScheme = {
  name: 'New scheme',
  frames: [
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [12, 20, 28, 36, 44, 52, 60, 68],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [20, 28, 36, 44, 52, 60, 68, 12],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [28, 36, 44, 52, 60, 68, 12, 20],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [36, 44, 52, 60, 68, 12, 20, 28],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [44, 52, 60, 68, 12, 20, 28, 36],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [52, 60, 68, 12, 20, 28, 36, 44],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [60, 68, 12, 20, 28, 36, 44, 52],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [68, 12, 20, 28, 36, 44, 52, 60],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [8, 9, 10, 11, 12, 13, 14, 15],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [16, 17, 18, 19, 20, 21, 22, 23],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [24, 25, 26, 27, 28, 29, 30, 31],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [32, 33, 34, 35, 36, 37, 38, 39],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [40, 41, 42, 43, 44, 45, 46, 47],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [48, 49, 50, 51, 52, 53, 54, 55],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [56, 57, 58, 59, 60, 61, 62, 63],
    },
    {
      ...DEFAULT_LIGHTS_FRAME,
      colorIndexes: [0, 1, 2, 3, 4, 5, 6, 7],
    },
  ],
};

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
    value: 'step',
    label: 'Step',
  },
  {
    value: 'fade',
    label: 'Fade',
  },
];

export const LIGHTS_FRAME_TEMPO_OPTIONS: LightsFrameTempoOption[] = [
  1, 2, 3, 4, 8, 16, 32, 48, 60, 80, 120, 240,
]
  .sort((a, b) => (a > b ? 1 : -1))
  .map((index) => ({
    value: `${index}`,
    label: `${index} bpm - ${Math.round(60_000 / index)} ms`,
  }));

export const DEFAULT_COLOR_PALETTE = `
#000000 #323232 #646464 #7d7d7d #afafaf #c8c8c8 #e1e1e1 #fafafa
#640000 #960000 #c80000 #fa0000 #fa3232 #fa6464 #fa9696 #fac8c8
#643200 #964b00 #c86400 #fa7d00 #fa9632 #faaf64 #fac896 #fae1c8
#646400 #969600 #c8c800 #fafa00 #fafa32 #fafa64 #fafa96 #fafac8
#326400 #4b9600 #64c800 #7dfa00 #96fa32 #affa64 #c8fa96 #e1fac8
#006400 #009600 #00c800 #00fa00 #32fa32 #64fa64 #96fa96 #c8fac8
#006432 #00964b #00c864 #00fa7d #32fa96 #64faaf #96fac8 #c8fae1
#006464 #009696 #00c8c8 #00fafa #32fafa #64fafa #96fafa #c8fafa
#003264 #004b96 #0064c8 #007dfa #3296fa #64afaf #96c8fa #c8e1fa
#000064 #000096 #0000c8 #0000fa #3232fa #6464fa #9696fa #c8c8fa
#320064 #4b0096 #6400c8 #7d00fa #9632fa #af64fa #c896fa #e1c8fa
#640064 #960096 #c800c8 #fa00fa #fa32fa #fa64fa #fa96fa #fac8fa
#640032 #96004b #c80064 #fa007d #fa3296 #fa64af #fa96c8 #fac8e1
`;

export const DEFAULT_COLOR = '#000000';

export const DEFAULT_LIGHTS_FRAME_TEMPO = 120;
export const DEFAULT_LIGHTS_FRAME_TYPE: LightsFrameType = 'step';
export const DEFAULT_LIGHTS_FRAME: LightsFrame = {
  type: DEFAULT_LIGHTS_FRAME_TYPE,
  tempo: DEFAULT_LIGHTS_FRAME_TEMPO,
  colorIndexes: [],
};

export const DEFAULT_LIGHTS_SCHEME_COLORS = DEFAULT_COLOR_PALETTE.replaceAll('\n', ' ')
  .split(' ')
  .filter(Boolean);

export const DEFAULT_LIGHTS_SCHEME: LightsScheme = {
  name: 'New scheme',
  colors: DEFAULT_LIGHTS_SCHEME_COLORS,
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

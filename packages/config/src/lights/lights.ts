import type { LightsFrame, LightsFrameType, LightsScheme, LightsSizeOption } from './lights.types';

export const LIGHTS_SIZES: LightsSizeOption[] = [
  {
    value: 8,
    label: '8 leds',
  },
  {
    value: 16,
    label: '16 leds',
  },
  {
    value: 64,
    label: '64 leds',
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
export const DEFAULT_LIGHTS_SCHEME_SIZE = 16;
export const DEFAULT_LIGHTS_SCHEME_COLORS = ['#000000'];

export const DEFAULT_LIGHTS_SCHEME: LightsScheme = {
  size: DEFAULT_LIGHTS_SCHEME_SIZE,
  colors: DEFAULT_LIGHTS_SCHEME_COLORS,
  frames: [DEFAULT_LIGHTS_FRAME],
};

import { DEFAULT_LIGHTS_FRAME_TEMPO, DEFAULT_LIGHTS_FRAME_TYPE } from 'config/lights';

import type { LightsScheme } from 'config/lights.types';
import type { ConnectionRequestLightsSchemeData } from 'config/connections.types';

const hexToRGB = (hex: string) => {
  const hexNumber = Number.parseInt(hex.replace('#', ''), 16);
  return [hexNumber >> 16, (hexNumber >> 8) & 0xff, hexNumber & 0xff];
};

export const lightsSchemeColorsToConnectionRequest = (colors: LightsScheme['colors']) => {
  const request: ConnectionRequestLightsSchemeData = {
    type: 'COLORS',
    data: {
      colors: colors.flatMap((color) => hexToRGB(color)),
    },
  };

  return JSON.stringify(request);
};

export const lightsSchemeFrameToConnectionRequest = (frame: LightsScheme['frames'][0]) => {
  const request: ConnectionRequestLightsSchemeData = {
    type: 'FRAME',
    data: {
      type: frame.type,
      tempo: frame.tempo,
      colors: frame.colorIndexes,
    },
  };

  return JSON.stringify(request);
};

export const editorColorUpdatedToConnectionRequest = (color: string) => {
  return [
    lightsSchemeColorsToConnectionRequest([color]),
    lightsSchemeFrameToConnectionRequest({
      type: DEFAULT_LIGHTS_FRAME_TYPE,
      tempo: DEFAULT_LIGHTS_FRAME_TEMPO,
      colorIndexes: [0],
    }),
  ].join('\n');
};

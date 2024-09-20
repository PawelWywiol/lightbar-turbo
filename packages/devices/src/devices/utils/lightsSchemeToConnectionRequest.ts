import { hexToRGB } from 'utils/hexToRGB';

import { DEFAULT_LIGHTS_FRAME_TEMPO, DEFAULT_LIGHTS_FRAME_TYPE } from '../../lights/lights.config';

import type { LightsScheme } from '../../lights/lights.types';
import type { ConnectionRequestData } from '../../connections/connections.types';

export const lightsSchemeColorsToConnectionRequest = (colors: string[]) => {
  const request: ConnectionRequestData = {
    type: 'colors',
    data: {
      colors: colors.flatMap((color) => hexToRGB(color)),
    },
  };

  return JSON.stringify(request);
};

export const lightsSchemeFrameToConnectionRequest = (
  frame: LightsScheme['frames'][0],
  deviceLedsCount?: number | undefined,
) => {
  const request: ConnectionRequestData = {
    type: 'frame',
    data: {
      type: frame.type,
      tempo: frame.tempo,
      colors: frame.colorIndexes.slice(0, deviceLedsCount),
    },
  };

  return JSON.stringify(request);
};

export const editorColorUpdatedToConnectionRequest = (
  color: string,
  deviceLedsCount?: number | undefined,
) => {
  return [
    lightsSchemeColorsToConnectionRequest([color]),
    lightsSchemeFrameToConnectionRequest(
      {
        type: DEFAULT_LIGHTS_FRAME_TYPE,
        tempo: DEFAULT_LIGHTS_FRAME_TEMPO,
        colorIndexes: [0],
      },
      deviceLedsCount,
    ),
  ].join('\n');
};

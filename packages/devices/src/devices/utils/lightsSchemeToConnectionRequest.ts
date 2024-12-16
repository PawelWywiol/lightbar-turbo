import { DEFAULT_LIGHTS_FRAME_TEMPO, DEFAULT_LIGHTS_FRAME_TYPE } from '../../lights/lights.config';

import type { LightColor, LightsScheme } from '../../lights/lights.types';
import type { ConnectionRequestData } from '../../connections/connections.types';

export const lightsSchemeFrameToConnectionRequest = (
  frame: LightsScheme['frames'][0],
  deviceLedsCount?: number,
) => {
  const request: ConnectionRequestData = {
    type: 'frame',
    data: {
      type: frame.type,
      tempo: frame.tempo,
      colors: frame.colors.slice(
        0,
        typeof deviceLedsCount === 'number' ? deviceLedsCount : frame.colors.length,
      ),
    },
  };

  return JSON.stringify(request);
};

export const editorColorUpdatedToConnectionRequest = (color: string, deviceLedsCount?: number) => {
  return [
    lightsSchemeFrameToConnectionRequest(
      {
        type: DEFAULT_LIGHTS_FRAME_TYPE,
        tempo: DEFAULT_LIGHTS_FRAME_TEMPO,
        colors: [0 as LightColor],
      },
      deviceLedsCount,
    ),
  ].join('\n');
};

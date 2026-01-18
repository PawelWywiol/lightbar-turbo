import type { ConnectionRequestData } from '../../connections/connections.types';
import type { LightsScheme } from '../../lights/lights.types';

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

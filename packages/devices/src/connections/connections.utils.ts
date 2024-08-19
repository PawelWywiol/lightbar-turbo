import type { ConnectionResponseData } from './connections.types';

export const isConnectionResponseData = (
  responseData: unknown,
): responseData is ConnectionResponseData => {
  if (typeof responseData !== 'object' || responseData === null) {
    return false;
  }

  const { type, data } = responseData as ConnectionResponseData;

  if (type !== 'info' || typeof data !== 'object' || data === null) {
    return false;
  }

  const { leds, uid, space } = data;

  return !!(typeof uid === 'string' && typeof leds === 'number' && typeof space === 'number');
};

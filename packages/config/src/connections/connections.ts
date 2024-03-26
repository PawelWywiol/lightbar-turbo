import type { ConnectionResponseData } from './connections.types';

const isConnectionResponseData = (data: unknown): data is ConnectionResponseData => {
  if (typeof data === 'object' && data !== null) {
    const { type, data: responseData } = data as ConnectionResponseData;
    if (type === 'INFO' && typeof responseData === 'object' && responseData !== null) {
      const { ver, sdk, uid, free, leds } = responseData;
      if (
        typeof ver === 'string' &&
        typeof sdk === 'string' &&
        typeof uid === 'string' &&
        typeof free === 'number' &&
        typeof leds === 'number'
      ) {
        return true;
      }
    }
  }
  return false;
};

export const parseSafeConnectionResponseData = (
  json: string,
): ConnectionResponseData | undefined => {
  try {
    const data = JSON.parse(json) as unknown;

    if (isConnectionResponseData(data)) {
      return data;
    }
  } catch {}

  return undefined;
};

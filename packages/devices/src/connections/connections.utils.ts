import type { ConnectionResponseData } from './connections.types';

const isConnectionResponseData = (data: unknown): data is ConnectionResponseData => {
  if (typeof data === 'object' && data !== null) {
    const { type, data: responseData } = data as ConnectionResponseData;
    if (type === 'info' && typeof responseData === 'object' && responseData !== null) {
      const { leds, space, heap, ap } = responseData;
      if (
        typeof leds === 'number' &&
        typeof ap === 'string' &&
        typeof space === 'number' &&
        typeof heap === 'number'
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

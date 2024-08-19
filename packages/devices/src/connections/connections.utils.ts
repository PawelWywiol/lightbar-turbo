import type { ConnectionResponseData } from './connections.types';

const isConnectionResponseData = (data: unknown): data is ConnectionResponseData => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const { type, data: responseData } = data as ConnectionResponseData;

  if (type !== 'info' || typeof responseData !== 'object' || responseData === null) {
    return false;
  }

  const { leds, ap } = responseData;

  return !!(typeof leds === 'number' && typeof ap === 'string');
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

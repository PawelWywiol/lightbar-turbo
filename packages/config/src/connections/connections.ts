import type { ConnectionResponseData } from './connections.types';

const isConnectionResponseData = (data: unknown): data is ConnectionResponseData => {
  if (typeof data === 'object' && data !== null) {
    const { type, data: responseData } = data as ConnectionResponseData;
    if (type === 'INFO' && typeof responseData === 'object' && responseData !== null) {
      const { msg, ap, ip, app, ver, rev, sdk, uid, free, ssid, leds } = responseData;
      if (
        typeof msg === 'string' &&
        typeof ap === 'string' &&
        typeof ip === 'string' &&
        typeof app === 'string' &&
        typeof ver === 'string' &&
        typeof rev === 'string' &&
        typeof sdk === 'string' &&
        typeof uid === 'string' &&
        typeof free === 'string' &&
        typeof ssid === 'string' &&
        typeof leds === 'string'
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

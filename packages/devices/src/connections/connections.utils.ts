import {
  CONNECTION_REQUEST_EOL_INFO,
  CONNECTION_REQUEST_INFO_LENGTH,
  CONNECTION_REQUEST_SIZE_INFO_LENGTH,
  CONNECTION_REQUEST_TYPE,
  CONNECTION_REQUEST_TYPE_INFO_LENGTH,
  PASSWORD_MAX_LENGTH,
  SSID_MAX_LENGTH,
} from './connections.config';

import type { ConnectionRequestData, ConnectionResponseData } from './connections.types';

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

export const connectionRequestWifiBinaryData = (
  data: Extract<ConnectionRequestData, { type: 'wifi' }>,
) => {
  const { ssid, password } = data.data;

  const size = CONNECTION_REQUEST_INFO_LENGTH + SSID_MAX_LENGTH + PASSWORD_MAX_LENGTH;

  const buffer = new Uint8Array(size);
  const view = new DataView(buffer.buffer);

  view.setUint32(0, CONNECTION_REQUEST_TYPE.wifi, true);
  // view.setUint32(0, CONNECTION_REQUEST_TYPE.wifi); but reverse the bytes, so it's 0x69_66_69_77 instead of 0x77_69_66_69
  view.setUint32(CONNECTION_REQUEST_SIZE_INFO_LENGTH, size - CONNECTION_REQUEST_INFO_LENGTH, true);

  let offset = CONNECTION_REQUEST_TYPE_INFO_LENGTH + CONNECTION_REQUEST_SIZE_INFO_LENGTH;

  buffer.set(new TextEncoder().encode(ssid), offset);
  offset += SSID_MAX_LENGTH;

  buffer.set(new TextEncoder().encode(password), offset);
  offset += PASSWORD_MAX_LENGTH;

  view.setUint32(offset, CONNECTION_REQUEST_EOL_INFO, true);

  return buffer;
};

export const connectionRequestDataToBinaryData = (
  requests: ConnectionRequestData[],
): Uint8Array => {
  const binaryResults = requests.map((requestData) => {
    const requestDataType = requestData.type;

    switch (requestDataType) {
      case 'wifi': {
        return connectionRequestWifiBinaryData(requestData);
      }
      case 'colors': {
        const { colors } = requestData.data;

        const buffer = new Uint8Array(4 + colors.length * 4);
        const view = new DataView(buffer.buffer);

        view.setUint32(0, CONNECTION_REQUEST_TYPE.colors);

        colors.forEach((color, index) => view.setUint32(4 + index * 4, color));

        return buffer;
      }
      case 'frame': {
        const { type, tempo, colors } = requestData.data;

        const buffer = new Uint8Array(4 + 4 + 4 + colors.length * 4);
        const view = new DataView(buffer.buffer);

        view.setUint32(0, CONNECTION_REQUEST_TYPE.frame);

        view.setUint32(4, type);
        view.setUint32(8, tempo);

        colors.forEach((color, index) => view.setUint32(12 + index * 4, color));

        return buffer;
      }
      default: {
        const x: never = requestDataType;

        throw new Error(`Unknown request data type: ${x as string}`);
      }
    }
  });

  const totalLength = binaryResults.reduce((accumulator, buffer) => accumulator + buffer.length, 0);
  const result = new Uint8Array(totalLength);

  let offset = 0;
  binaryResults.forEach((buffer) => {
    result.set(buffer, offset);
    offset += buffer.length;
  });

  return result;
};

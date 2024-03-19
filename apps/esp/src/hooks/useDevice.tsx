import { useEffect, useState } from 'preact/hooks';
import { parseSafeConnectionResponseData } from 'config/connections';

import { useWebSocket } from './useWebSocket';

import type { ConnectionRequestData, ConnectionResponseData } from 'config/connections.types';

export const useDevice = () => {
  const { status, data, message, send } = useWebSocket();
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  const setWiFi = (ssid: string, pass: string) => {
    const requestData: ConnectionRequestData = {
      type: 'WIFI',
      data: { ssid, pass },
    };

    send(JSON.stringify(requestData));
  };

  useEffect(() => {
    setInfo(parseSafeConnectionResponseData(typeof data === 'string' ? data : ''));
  }, [data]);

  return { status, info, message, setWiFi };
};

export default useDevice;

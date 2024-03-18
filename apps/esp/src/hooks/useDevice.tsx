import { useEffect, useState } from 'preact/hooks';
import { parseSafeConnectionResponseData } from 'config/connections';

import { useWebSocket } from './useWebSocket';

import type { ConnectionResponseData } from 'config/connections.types';

export const useDevice = () => {
  const { status, data, message, send } = useWebSocket();
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  const setWiFi = (ssid: string, password: string) => {
    send(
      JSON.stringify({
        type: 'WIFI',
        data: { ssid, password },
      }),
    );
  };

  useEffect(() => {
    setInfo(parseSafeConnectionResponseData(typeof data === 'string' ? data : ''));
  }, [data]);

  return { status, info, message, setWiFi };
};

export default useDevice;

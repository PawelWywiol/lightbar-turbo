import { useEffect, useState } from 'preact/hooks';
import { parseSafeConnectionResponseData } from 'devices/connections.utils';

import { env } from '../../env.mjs';

import type { ConnectionRequestData, ConnectionResponseData } from 'devices/connections.types';

export const useDevice = () => {
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  const setWiFi = (ssid: string, pass: string) => {
    const requestData: ConnectionRequestData = {
      type: 'WIFI',
      data: { ssid, pass },
    };
  };

  useEffect(() => {}, []);

  return { status, info, setWiFi };
};

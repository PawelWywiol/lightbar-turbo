import { useEffect, useState } from 'preact/hooks';

import { useWebSocket } from './useWebSocket';

import type { ConnectionResponseData } from 'config/connections.types';

export const useDevice = () => {
  const { status, data, message } = useWebSocket();
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  useEffect(() => {
    if (data) {
      setInfo(data as ConnectionResponseData);
    }
  }, [data]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('websocket status', { status, data, message });
  }, [status]);

  return { status, info, message };
};

export default useDevice;

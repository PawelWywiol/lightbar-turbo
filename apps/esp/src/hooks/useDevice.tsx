import { useEffect } from 'preact/hooks';

import { useWebSocket } from './useWebSocket';

export const useDevice = () => {
  const { status, data, message } = useWebSocket();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('websocket status', { status, data, message });
  }, [status]);
};

export default useDevice;

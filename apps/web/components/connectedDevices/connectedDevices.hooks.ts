import { useContext, useEffect, useRef, useState } from 'react';

import { parseSafeConnectionResponseData } from 'config/connections';
import { subscribeCustomEvent } from 'utils/customEvent';

import { ConnectedDevicesContext } from './connectedDevices.provider';

import type { ConnectionResponseData, ConnectionType } from 'config/connections.types';
import type { DeviceCustomEventDispatch } from 'config/devices.types';

export const useConnectedDevices = () => useContext(ConnectedDevicesContext);

export const useConnectedDeviceWebSocket = ({ url }: { url: string }) => {
  const socket = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionType>('CONNECTING');
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  const send = (d: string | ArrayBufferLike | Blob | ArrayBufferView) =>
    socket.current && status === 'CONNECTED' && socket.current.send(d);

  useEffect(() => {
    const onOpen = () => {
      setStatus('CONNECTED');
    };
    const onError = () => {
      setStatus('CLOSED');
    };
    const onClose = () => {
      setStatus('CLOSED');
    };
    const onMessage = (event: MessageEvent) => {
      event.data && setInfo(parseSafeConnectionResponseData(event.data as string));
    };

    const init = () => {
      cleanup();

      socket.current = new WebSocket(url, ['arduino']);
      socket.current.binaryType = 'arraybuffer';
      socket.current.addEventListener('open', onOpen);
      socket.current.addEventListener('error', onError);
      socket.current.addEventListener('close', onClose);
      socket.current.addEventListener('message', onMessage);
    };

    const cleanup = () => {
      if (socket.current) {
        socket.current.removeEventListener('open', onOpen);
        socket.current.removeEventListener('error', onError);
        socket.current.removeEventListener('close', onClose);
        socket.current.removeEventListener('message', onMessage);

        socket.current.close();
        socket.current = null;
      }
    };

    init();

    subscribeCustomEvent<DeviceCustomEventDispatch>({
      name: 'app:device:selected',
      callback: ({ detail }) => {
        if (detail === url || url.length === 0) {
          init();
        }
      },
    });

    return () => {
      cleanup();
    };
  }, [url]);

  return { status, info, send };
};

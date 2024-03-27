import { useEffect, useRef, useState } from 'preact/hooks';
import { MESSAGES } from 'config/messages';

import type { Message } from 'config/messages.types';
import type { ConnectionType } from 'config/connections.types';

export const useWebSocket = ({
  url,
}: {
  url?: string | undefined;
} = {}) => {
  const socket = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState<ConnectionType>('CONNECTING');
  const [message, setMessage] = useState<Message | undefined>({
    type: 'info',
    message: MESSAGES.connection.connecting,
  });
  const [data, setData] = useState<unknown>(null);

  const send = (d: string | ArrayBufferLike | Blob | ArrayBufferView) =>
    socket.current && status === 'CONNECTED' && socket.current.send(d);

  useEffect(() => {
    const fixedUrl = url ?? `ws://${window.location.host}/ws`;

    const onOpen = () => {
      setStatus('CONNECTED');
      setMessage({ type: 'info', message: MESSAGES.connection.connected });
    };
    const onError = () => {
      setStatus('CLOSED');
      setMessage({ type: 'error', message: MESSAGES.connection.error });
    };
    const onClose = () => {
      setStatus('CLOSED');
      setMessage({ type: 'info', message: MESSAGES.connection.closed });
    };
    const onMessage = (event: MessageEvent) => {
      setData(event.data);
    };

    socket.current = new WebSocket(fixedUrl, ['arduino']);
    socket.current.binaryType = 'arraybuffer';
    socket.current.addEventListener('open', onOpen);
    socket.current.addEventListener('error', onError);
    socket.current.addEventListener('close', onClose);
    socket.current.addEventListener('message', onMessage);

    return () => {
      if (socket.current) {
        socket.current.removeEventListener('open', onOpen);
        socket.current.removeEventListener('error', onError);
        socket.current.removeEventListener('close', onClose);
        socket.current.removeEventListener('message', onMessage);

        socket.current.close();
      }
    };
  }, [url]);

  return { status, data, message, send };
};

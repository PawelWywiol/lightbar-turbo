import { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { subscribeCustomEvent, unsubscribeCustomEvent } from 'utils/customEvent';
import { parseSafeConnectionResponseData } from '../connections/connections.utils';

import { getConnectedDeviceData } from './devices.utils';
import { CONNECTED_DEVICE_API_URL } from './devices.config';

import type { CustomEventCallback } from 'utils/customEvent.types';
import type { ConnectionResponseData, ConnectionType } from '../connections/connections.types';
import { DeviceCustomEventDispatch } from './devices.types';

export const useConnectedDeviceData = ({ url }: { url: string }) => {
  const sendAbortControllerReference = useRef<AbortController | undefined>(undefined);
  const updatingStatusReference = useRef(false);
  const [status, setStatus] = useState<ConnectionType>('CLOSED');
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  const updateStatus = useCallback(async () => {
    if (updatingStatusReference.current) {
      return;
    }

    updatingStatusReference.current = true;

    const responseData = await getConnectedDeviceData(url);
    if (responseData) {
      setStatus('CONNECTED');
      setInfo(responseData);

      return;
    } else {
      setStatus('CLOSED');
      setInfo(undefined);
    }

    updatingStatusReference.current = false;
  }, [url]);

  const send = (body: string) => {
    sendAbortControllerReference.current?.abort();
    sendAbortControllerReference.current = new AbortController();

    fetch(CONNECTED_DEVICE_API_URL(url), {
      method: 'POST',
      body,
      signal: sendAbortControllerReference.current.signal,
    })
      .then((responseData) => responseData.text())
      .then((responseData) => {
        const data = parseSafeConnectionResponseData(responseData);

        if (responseData) {
          setStatus('CONNECTED');
          setInfo(data);
        } else {
          setStatus('CLOSED');
          setInfo(undefined);
        }
      })
      .catch(() => {
        setStatus('CLOSED');
        setInfo(undefined);
      });
  };

  useEffect(() => {
    const deviceSelectedEvent: CustomEventCallback<DeviceCustomEventDispatch> = {
      name: 'app:device:selected',
      callback: ({ detail }) => {
        if (detail === url || url.length === 0) {
          void updateStatus();
        }
      },
    };

    void updateStatus();
    subscribeCustomEvent<DeviceCustomEventDispatch>(deviceSelectedEvent);

    return () => {
      unsubscribeCustomEvent<DeviceCustomEventDispatch>(deviceSelectedEvent);
    };
  }, [url, updateStatus]);

  return { status, updateStatus, info, send };
};

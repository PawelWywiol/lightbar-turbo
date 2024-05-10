import { useCallback, useContext, useEffect, useState } from 'react';

import { subscribeCustomEvent, unsubscribeCustomEvent } from 'utils/customEvent';

import { ConnectedDevicesContext } from './connectedDevices.provider';
import { getConnectedDeviceData, postConnectedDeviceData } from './connectedDevices.utils';

import type { CustomEventCallback } from 'utils/customEvent.types';
import type { ConnectionResponseData, ConnectionType } from 'config/connections.types';
import type { DeviceCustomEventDispatch } from 'config/devices.types';

export const useConnectedDevices = () => useContext(ConnectedDevicesContext);

export const useConnectedDeviceData = ({ url }: { url: string }) => {
  const [status, setStatus] = useState<ConnectionType>('CONNECTING');
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

  const updateStatus = useCallback(async () => {
    const responseData = await getConnectedDeviceData(url);
    if (responseData) {
      setStatus('CONNECTED');
      setInfo(responseData);

      return;
    }

    setStatus('CLOSED');
    setInfo(undefined);
  }, [url]);

  const send = async (body: string) => {
    const responseData = await postConnectedDeviceData(url, body);

    if (responseData) {
      setStatus('CONNECTED');
      setInfo(responseData);

      return;
    }

    setStatus('CLOSED');
    setInfo(undefined);
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

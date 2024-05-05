import { useContext, useEffect, useState } from 'react';

import { subscribeCustomEvent, unsubscribeCustomEvent } from 'utils/customEvent';

import { ConnectedDevicesContext } from './connectedDevices.provider';
import { getConnectedDeviceData, postConnectedDeviceData } from './connectedDevices.utils';
import { CONNECTED_DEVICE_GET_STATE_INTERVAL } from './connectedDevices.config';

import type { CustomEventCallback } from 'utils/customEvent.types';
import type { ConnectionResponseData, ConnectionType } from 'config/connections.types';
import type { DeviceCustomEventDispatch } from 'config/devices.types';

export const useConnectedDevices = () => useContext(ConnectedDevicesContext);

export const useConnectedDeviceData = ({ url }: { url: string }) => {
  const [status, setStatus] = useState<ConnectionType>('CONNECTING');
  const [info, setInfo] = useState<ConnectionResponseData | undefined>();

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
    const updateConnectedDeviceInfo = async () => {
      const responseData = await getConnectedDeviceData(url);
      if (responseData) {
        setStatus('CONNECTED');
        setInfo(responseData);

        return;
      }

      setStatus('CLOSED');
      setInfo(undefined);
    };
    const getStateInterval = setInterval(() => {
      void updateConnectedDeviceInfo();
    }, CONNECTED_DEVICE_GET_STATE_INTERVAL);

    const deviceSelectedEvent: CustomEventCallback<DeviceCustomEventDispatch> = {
      name: 'app:device:selected',
      callback: ({ detail }) => {
        if (detail === url || url.length === 0) {
          void updateConnectedDeviceInfo();
        }
      },
    };

    void updateConnectedDeviceInfo();
    subscribeCustomEvent<DeviceCustomEventDispatch>(deviceSelectedEvent);

    return () => {
      unsubscribeCustomEvent<DeviceCustomEventDispatch>(deviceSelectedEvent);
      clearInterval(getStateInterval);
    };
  }, [url]);

  return { status, info, send };
};

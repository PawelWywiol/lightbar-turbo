import { useCallback, useContext, useMemo } from 'react';
import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import { dispatchCustomEvent } from 'utils/customEvent';

import {
  loadConnectedDevices,
  loadLastSelectedDeviceUrl,
  saveConnectedDevices,
  saveLastSelectedDeviceUrl,
  updateConnectedDevicesList,
} from './devices.utils';
import { findLocalNetworkConnectedDevices } from './devices.scan';
import { CONNECTED_DEVICES_MAX_COUNT } from './devices.config';
import { ConnectedDeviceResolver } from './devices';

import type { ConnectedDevice, DeviceCustomEventDispatch } from './devices.types';

interface ConnectedDevicesContextProps {
  devices: ConnectedDevice[];
  updateDevice: (device: ConnectedDevice) => void;
  removeDevice: (device: ConnectedDevice) => void;
  findDevices: () => void;
  scanProgress: number;
  selected?: string | undefined;
  select: (url: string) => void;
}

export const ConnectedDevicesContext = createContext<ConnectedDevicesContextProps>({
  devices: [],
  updateDevice: () => {
    // void
  },
  removeDevice: () => {
    // void
  },
  findDevices: () => {
    // void
  },
  scanProgress: 100,
  selected: undefined,
  select: () => {
    // void
  },
});

export const useConnectedDevices = () => useContext(ConnectedDevicesContext);

export const ConnectedDevicesProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);
  const [scanProgress, setScanProgress] = useState(100);
  const [selected, setSelected] = useState<string | undefined>();

  const updateDevice = useCallback((device: ConnectedDevice) => {
    setDevices((previousDevices) => {
      const updatedDevices = updateConnectedDevicesList(previousDevices, device);

      saveConnectedDevices(updatedDevices);

      return updatedDevices.slice(-1 * CONNECTED_DEVICES_MAX_COUNT);
    });
  }, []);

  const removeDevice = useCallback((device: ConnectedDevice) => {
    setDevices((previousDevices) => {
      const updatedDevices = previousDevices.filter((d) => d.url !== device.url);

      saveConnectedDevices(updatedDevices);

      return updatedDevices;
    });
  }, []);

  const findDevices = useCallback(() => {
    void findLocalNetworkConnectedDevices(setScanProgress).then((urls) => {
      for (const url of urls) {
        updateDevice({ url });
      }
    });
  }, [updateDevice]);

  const select = useCallback((url: string) => {
    setSelected(url);
    saveLastSelectedDeviceUrl(url);
  }, []);

  const value = useMemo(
    () => ({ devices, updateDevice, removeDevice, findDevices, scanProgress, selected, select }),
    [devices, updateDevice, removeDevice, findDevices, scanProgress, selected, select],
  );

  useEffect(() => {
    setDevices(loadConnectedDevices());
    setSelected(loadLastSelectedDeviceUrl());
  }, []);

  useEffect(() => {
    dispatchCustomEvent<DeviceCustomEventDispatch>({
      name: 'app:device:selected',
      detail: selected ?? '',
    });
  }, [selected]);

  useEffect(() => {
    const firstDevice = devices[0];

    if (!selected?.length && firstDevice) {
      setSelected(firstDevice.url);
    }
  }, [devices, selected]);

  return (
    <>
      {devices.map((device) => (
        <ConnectedDeviceResolver
          key={device.url}
          device={device}
          onChange={updateDevice}
          selected={selected === device.url}
        />
      ))}
      <ConnectedDevicesContext.Provider value={value}>{children}</ConnectedDevicesContext.Provider>
    </>
  );
};

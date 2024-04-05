'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import {
  loadConnectedDevices,
  saveConnectedDevices,
  updateDevicesList,
} from './connectedDevices.utils';
import { ConnectedDeviceWebSocket } from './connectedDevices';

import type { ConnectedDevice } from './connectedDevices.types';

interface ConnectedDevicesContext {
  devices: ConnectedDevice[];
  updateDevice: (device: ConnectedDevice) => void;
  removeDevice: (device: ConnectedDevice) => void;
}

export const ConnectedDevicesContext = createContext<ConnectedDevicesContext>({
  devices: [],
  updateDevice: () => {
    // void
  },
  removeDevice: () => {
    // void
  },
});

export const ConnectedDevicesProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);

  const updateDevice = (device: ConnectedDevice) => {
    setDevices((previousDevices) => {
      const updatedDevices = updateDevicesList(previousDevices, device);

      saveConnectedDevices(updatedDevices);

      return updatedDevices;
    });
  };

  const removeDevice = (device: ConnectedDevice) => {
    setDevices((previousDevices) => {
      const updatedDevices = previousDevices.filter((d) => d.url !== device.url);

      saveConnectedDevices(updatedDevices);

      return updatedDevices;
    });
  };

  useEffect(() => {
    setDevices(loadConnectedDevices());
  }, []);

  return (
    <>
      {devices.map((device) => (
        <ConnectedDeviceWebSocket key={device.url} device={device} onChange={updateDevice} />
      ))}
      <ConnectedDevicesContext.Provider value={{ devices, updateDevice, removeDevice }}>
        {children}
      </ConnectedDevicesContext.Provider>
    </>
  );
};

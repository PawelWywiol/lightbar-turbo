'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import {
  loadConnectedDevices,
  saveConnectedDevices,
  updateConnectedDevicesList,
} from './connectedDevices.utils';
import { ConnectedDeviceWebSocket } from './connectedDevices';
import { findLocalNetworkConnectedDevices } from './connectedDevices.scan';
import { MAX_CONNECTED_DEVICES } from './connectedDevices.config';

import type { ConnectedDevice } from './connectedDevices.types';

interface ConnectedDevicesContext {
  devices: ConnectedDevice[];
  updateDevice: (device: ConnectedDevice) => void;
  removeDevice: (device: ConnectedDevice) => void;
  findDevices: () => void;
}

export const ConnectedDevicesContext = createContext<ConnectedDevicesContext>({
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
});

export const ConnectedDevicesProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<ConnectedDevice[]>([]);

  const updateDevice = (device: ConnectedDevice) => {
    setDevices((previousDevices) => {
      const updatedDevices = updateConnectedDevicesList(previousDevices, device);

      saveConnectedDevices(updatedDevices);

      return updatedDevices.slice(-1 * MAX_CONNECTED_DEVICES);
    });
  };

  const removeDevice = (device: ConnectedDevice) => {
    setDevices((previousDevices) => {
      const updatedDevices = previousDevices.filter((d) => d.url !== device.url);

      saveConnectedDevices(updatedDevices);

      return updatedDevices;
    });
  };

  const findDevices = () => {
    void findLocalNetworkConnectedDevices().then((urls) => {
      for (const url of urls) {
        updateDevice({ url, label: url });
      }
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
      <ConnectedDevicesContext.Provider
        value={{ devices, updateDevice, removeDevice, findDevices }}
      >
        {children}
      </ConnectedDevicesContext.Provider>
    </>
  );
};

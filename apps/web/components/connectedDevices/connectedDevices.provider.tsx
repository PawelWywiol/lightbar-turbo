'use client';

import type { ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import { loadConnectedDevices, saveConnectedDevices } from './connectedDevices.utils';

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

  useEffect(() => {
    setDevices(loadConnectedDevices());
  }, []);

  const updateDevice = (device: ConnectedDevice) => {
    if (!device.url || !device.label) {
      return;
    }

    setDevices((previousDevices) => {
      let deviceExists = false;

      const updatedDevices = previousDevices.map((d) => {
        if (d.url === device.url) {
          deviceExists = true;
          return { ...d, ...device };
        }

        return d;
      });

      if (!deviceExists) {
        updatedDevices.push(device);
      }

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

  return (
    <ConnectedDevicesContext.Provider value={{ devices, updateDevice, removeDevice }}>
      {children}
    </ConnectedDevicesContext.Provider>
  );
};

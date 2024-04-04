import { useContext } from 'react';

import { ConnectedDevicesContext } from './connectedDevices.provider';

export const useConnectedDevices = () => useContext(ConnectedDevicesContext);

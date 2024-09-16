import { NetworkType } from 'devices/connections.types';
import { useConnectedDeviceData } from 'devices/devices.hooks';
import { CONNECTED_DEVICE_API_DEFAULT_URL } from 'devices/devices.config';

import { env } from '../env.mjs';

import { WifiSection } from './components/wifiSection.js';
import { TitleSection } from './components/titleSection.js';
import { InfoSection } from './components/infoSection.js';

export const App = () => {
  const { info, status, send } = useConnectedDeviceData({
    url: env['DEFAULT_HOST_DEVICE_URL'] ?? CONNECTED_DEVICE_API_DEFAULT_URL,
  });

  return (
    <main className={'relative flex flex-col gap-4 text-center'}>
      <TitleSection message={info?.message} />
      {status === 'CONNECTED' && (info?.network ?? NetworkType.Unknown) === NetworkType.AP && (
        <WifiSection send={send} />
      )}
      <InfoSection info={info} />
    </main>
  );
};

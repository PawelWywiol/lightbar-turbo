import { NetworkType } from 'devices/connections.types';
import { useConnectedDeviceData } from 'devices/devices.hooks';

import { useDevice } from './hooks/useDevice.js';
import { WifiSection } from './components/wifiSection.js';
import { TitleSection } from './components/titleSection.js';
import { InfoSection } from './components/infoSection.js';

export const App = () => {
  const { info, status, send } = useConnectedDeviceData();

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

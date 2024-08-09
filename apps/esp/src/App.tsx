import { NetworkType } from 'devices/connections.types';

import { useDevice } from './hooks/useDevice.js';
import { WifiSection } from './components/wifiSection.js';
import { TitleSection } from './components/titleSection.js';
import { InfoSection } from './components/infoSection.js';

export const App = () => {
  const { status, info, setWiFi } = useDevice();

  return (
    <main className={'relative flex flex-col gap-4 text-center'}>
      <TitleSection message={''} />
      {status === 'CONNECTED' && (info?.network ?? NetworkType.Unknown) === NetworkType.AP && (
        <WifiSection setWiFi={setWiFi} />
      )}
      <InfoSection info={info} />
    </main>
  );
};

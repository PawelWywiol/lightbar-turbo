import useDevice from './hooks/useDevice';
import { WifiSection } from './components/wifiSection';
import { TitleSection } from './components/titleSection';

export const App = () => {
  useDevice();

  return (
    <main className={'relative flex flex-col gap-4 text-center'}>
      <TitleSection />
      <WifiSection />
    </main>
  );
};

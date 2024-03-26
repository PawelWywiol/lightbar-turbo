import { useState } from 'preact/hooks';
import { Button } from 'ui/button';
import { Input } from 'ui/input';

export const WifiSection = ({ setWiFi }: { setWiFi: (ssid: string, password: string) => void }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');

  return (
    <section className="container m-auto max-w-md w-full flex flex-col gap-4 text-center">
      <Input
        type="text"
        placeholder="ssid"
        value={ssid}
        onChange={(event) => setSsid(event.currentTarget.value.slice(0, 32))}
      />
      <Input
        type="password"
        placeholder="password"
        value={password}
        onChange={(event) => setPassword(event.currentTarget.value.slice(0, 64))}
      />
      <Button
        onClick={() => {
          setWiFi(ssid, password);
          setSsid('');
          setPassword('');
        }}
        disabled={ssid.length === 0 || password.length === 0}
      >
        Save
      </Button>
    </section>
  );
};

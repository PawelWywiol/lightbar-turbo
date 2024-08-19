import { useState } from 'preact/hooks';
import { Button } from 'ui/button';
import { Input } from 'ui/input';

import type { ConnectionRequestData } from 'devices/connections.types';

const MAX_SSID_LENGTH = 32;
const MAX_PASSWORD_LENGTH = 64;

export const WifiSection = ({ send }: { send: (body: string) => Promise<void> }) => {
  const [wifiCredentials, setWiFiCredentials] = useState<ConnectionRequestData['data']>({
    ssid: '',
    pass: '',
  });

  const sendWiFiCredentials = () => {
    const requestData: ConnectionRequestData = {
      type: 'wifi',
      data: wifiCredentials,
    };

    void send(JSON.stringify(requestData));
  };

  return (
    <section className="container m-auto max-w-md w-full flex flex-col gap-4 text-center">
      <Input
        type="text"
        placeholder="ssid"
        value={wifiCredentials.ssid}
        onChange={(event) =>
          setWiFiCredentials({
            ...wifiCredentials,
            ssid: event.currentTarget.value.slice(0, MAX_SSID_LENGTH),
          })
        }
      />
      <Input
        type="password"
        placeholder="password"
        value={wifiCredentials.pass}
        onChange={(event) =>
          setWiFiCredentials({
            ...wifiCredentials,
            pass: event.currentTarget.value.slice(0, MAX_PASSWORD_LENGTH),
          })
        }
      />
      <Button
        onClick={() => {
          sendWiFiCredentials();
          setWiFiCredentials({ ssid: '', pass: '' });
        }}
        disabled={wifiCredentials.pass.length === 0 || wifiCredentials.ssid.length === 0}
      >
        Save
      </Button>
    </section>
  );
};

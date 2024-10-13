import { useState } from 'preact/hooks';
import { Button } from 'ui/button';
import { Input } from 'ui/input';

import type { ConnectionRequestData } from 'devices/connections.types';

const MAX_SSID_LENGTH = 32;
const MAX_PASSWORD_LENGTH = 64;

export const WifiSection = ({
  send,
}: {
  send: (request: ConnectionRequestData[]) => Promise<void>;
}) => {
  const [wifiCredentials, setWiFiCredentials] = useState<
    Extract<ConnectionRequestData, { type: 'wifi' }>['data']
  >({
    ssid: '',
    password: '',
  });

  const sendWiFiCredentials = () => {
    const request: ConnectionRequestData = {
      type: 'wifi',
      data: wifiCredentials,
    };

    void send([request]);
  };

  return (
    <section className="container m-auto w-sm max-w-full-gap flex flex-col gap-4 text-center">
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
        value={wifiCredentials.password}
        onChange={(event) =>
          setWiFiCredentials({
            ...wifiCredentials,
            password: event.currentTarget.value.slice(0, MAX_PASSWORD_LENGTH),
          })
        }
      />
      <Button
        onClick={() => {
          sendWiFiCredentials();
          setWiFiCredentials({ ssid: '', password: '' });
        }}
        disabled={wifiCredentials.password.length === 0 || wifiCredentials.ssid.length === 0}
      >
        Save
      </Button>
    </section>
  );
};

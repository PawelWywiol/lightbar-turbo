import { useEffect } from 'react';

import { MESSAGES } from 'config/messages';
import { formatBytes } from 'utils/formatBytes';

import { useConnectedDeviceWebSocket } from './connectedDevices.hooks';
import { connectedDeviceInfoStatus } from './connectedDevices.styled';

import type { ConnectedDevice } from './connectedDevices.types';

export const ConnectedDeviceWebSocket = ({
  device,
  onChange,
}: {
  device: ConnectedDevice;
  onChange: ({ info, status }: ConnectedDevice) => void;
}) => {
  const { info, status } = useConnectedDeviceWebSocket(device);

  useEffect(() => {
    onChange({ ...device, info, status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, status]);

  return null;
};

export const ConnectedDeviceInfo = ({
  device: { status, label, info, url },
}: {
  device: ConnectedDevice;
}) => {
  return (
    <div className="flex gap-4 flex-1 align-middle items-center text-left">
      <span className={connectedDeviceInfoStatus({ status })} />
      <span className="flex-1 flex flex-col gap-1">
        <span>{label ?? info?.data.ssid ?? url}</span>
        <span className="text-xs">
          {info?.msg ??
            MESSAGES.connection[
              (status?.toLocaleLowerCase() as keyof typeof MESSAGES.connection) ?? 'closed'
            ]}
        </span>
      </span>
      {info && (
        <span className="text-xs flex flex-col gap-1">
          <span>
            {info.data.leds} {MESSAGES.device.ledsCount}
          </span>
          <span>{formatBytes(info.data.free)}</span>
        </span>
      )}
    </div>
  );
};

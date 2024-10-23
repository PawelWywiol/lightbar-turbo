import { MESSAGES } from 'config/messages';
import { formatBytes } from 'utils/formatBytes';

import { connectedDeviceInfoStatus } from './connectedDeviceInfoStatus.styled';

import type { ConnectedDevice } from 'devices/devices.types';

export const ConnectedDeviceInfo = ({
  device: { status, label, info, url },
}: {
  device: ConnectedDevice;
}) => {
  return (
    <div className="flex gap-4 flex-1 align-middle items-center text-left">
      <span className={connectedDeviceInfoStatus({ status })} />
      <span className="flex-1 flex flex-col gap-1">
        <span>{label ?? info?.data.uid ?? url}</span>
        <span className="text-xs">
          {info?.message ??
            MESSAGES.connection[
              (status?.toLocaleLowerCase() as keyof typeof MESSAGES.connection) ?? 'closed'
            ]}
        </span>
      </span>
      {info && (
        <span className="text-xs flex flex-col gap-1 text-right">
          <span>
            {info.data.leds} {MESSAGES.device.leds}
          </span>
          <span>{formatBytes(info.data.space)}</span>
        </span>
      )}
    </div>
  );
};

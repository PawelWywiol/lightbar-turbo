import { MESSAGES } from 'config/messages';
import { formatBytes } from 'utils/formatBytes';

import { connectedDeviceInfoStatus } from './connectedDeviceInfoStatus.styled';

import type { ConnectedDevice } from 'devices/devices.types';

const getDeviceLabel = (device: ConnectedDevice): string =>
  device.label?.length ? device.label : (device.info?.data.uid ?? device.url);

const getDeviceFormattedLeds = (device: ConnectedDevice): string =>
  device.info?.data.leds ? `${device.info?.data.leds} ${MESSAGES.device.leds}` : '';

const getDeviceStatusMessage = (device: ConnectedDevice): string =>
  device.info?.message ??
  MESSAGES.connection[
    (device.status?.toLocaleLowerCase() as keyof typeof MESSAGES.connection) ?? 'closed'
  ];

const getFormattedFreeDeviceSpace = (device: ConnectedDevice): string | undefined =>
  device.info?.data.free ? formatBytes(device.info.data.free) : undefined;

const getFormattedTotalDeviceSpace = (device: ConnectedDevice): string | undefined =>
  device.info?.data.total ? formatBytes(device.info.data.total) : undefined;

export const ConnectedDeviceInfo = ({ device }: { device: ConnectedDevice }) => {
  const deviceLabel = getDeviceLabel(device);
  const formattedDeviceLeds = getDeviceFormattedLeds(device);
  const deviceStatusMessage = getDeviceStatusMessage(device);
  const formattedFreeDeviceSpace = getFormattedFreeDeviceSpace(device);
  const formattedTotalDeviceSpace = getFormattedTotalDeviceSpace(device);
  const deviceSpaceSeparator = formattedFreeDeviceSpace && formattedTotalDeviceSpace ? ' / ' : '';

  return (
    <div className="text-left h-10 grid grid-cols-[auto,1fr,auto] w-full gap-x-4 items-center">
      <span className={connectedDeviceInfoStatus({ status: device.status })} />
      <span className="truncate">{deviceLabel}</span>
      <span className="text-right text-xs">{formattedDeviceLeds}</span>
      <span className="text-xs truncate">{deviceStatusMessage}</span>
      <span className="text-right text-xs">
        {formattedFreeDeviceSpace} {deviceSpaceSeparator} {formattedTotalDeviceSpace}
      </span>
    </div>
  );
};

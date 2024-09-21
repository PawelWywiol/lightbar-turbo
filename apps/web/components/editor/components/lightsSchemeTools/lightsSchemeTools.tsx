import { DEVICE_SIZES } from 'devices/devices.config';
import { DropDownMenuWrapper } from 'ui/dropdownMenu';

import type { Device } from 'devices/devices.types';

export const LightsSchemeTools = ({
  device,
  setDevice,
}: {
  device: Device;
  setDevice: (device: Device) => void;
}) => (
  <div className="flex">
    <DropDownMenuWrapper
      options={DEVICE_SIZES.map((size) => ({
        label: size.label,
        onClick: () => setDevice({ ...device, size }),
      }))}
    />
  </div>
);

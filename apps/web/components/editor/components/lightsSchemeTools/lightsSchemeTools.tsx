import { DEVICE_SIZES } from 'config/devices';
import { DropDownMenu } from 'ui/dropdownMenu';

import type { Device } from 'config/devices.types';

export const LightsSchemeTools = ({
  device,
  setDevice,
}: {
  device: Device;
  setDevice: (device: Device) => void;
}) => (
  <div className="flex">
    <DropDownMenu
      options={DEVICE_SIZES.map((size) => ({
        label: size.label,
        onClick: () => setDevice({ ...device, size }),
      }))}
    />
  </div>
);

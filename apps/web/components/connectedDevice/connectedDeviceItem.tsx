import type { ConnectedDevice } from 'devices/devices.types';
import { Button } from 'ui/button';
import { DropDownMenuWrapper } from 'ui/dropdownMenu';
import { MESSAGES } from '../../lib/config/messages';
import type { ConnectedDeviceInput } from '../../lib/devices/devicesSchema';
import { ConnectedDeviceInfo } from './connectedDeviceInfo';

interface ConnectedDeviceItemProps {
  device: ConnectedDevice;
  isSelected: boolean;
  onSelect: (url: string) => void;
  onEdit: (device: ConnectedDeviceInput) => void;
  onDelete: (device: ConnectedDevice) => void;
}

export const ConnectedDeviceItem = ({
  device,
  isSelected,
  onSelect,
  onEdit,
  onDelete,
}: ConnectedDeviceItemProps) => (
  <div className="flex justify-center items-center text-left gap-4">
    <Button
      className="flex flex-1 justify-stretch p-2 h-auto"
      variant={isSelected ? 'secondary' : 'ghost'}
      onClick={() => onSelect(device.url)}
    >
      <ConnectedDeviceInfo device={device} />
    </Button>
    <DropDownMenuWrapper
      options={[
        {
          label: MESSAGES.common.select,
          onClick: () => onSelect(device.url),
        },
        {
          label: MESSAGES.common.edit,
          onClick: () => onEdit(device),
        },
        {
          label: MESSAGES.common.delete,
          onClick: () => onDelete(device),
        },
      ]}
    />
  </div>
);

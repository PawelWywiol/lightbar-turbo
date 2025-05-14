import { MESSAGES } from 'config/messages';
import { Button } from 'ui/button';
import { Input } from 'ui/input';

import type { ConnectedDeviceValidationSchema } from 'devices/devices.schema';
import type { ConnectedDevice } from 'devices/devices.types';

export const ConnectedDeviceEditor = ({
  deviceInfo,
  setDeviceInfo,
  updateDevice,
}: {
  deviceInfo: ConnectedDeviceValidationSchema;
  setDeviceInfo: (deviceInfo: ConnectedDeviceValidationSchema) => void;
  updateDevice: (device: ConnectedDevice) => void;
}) => (
  <div className="flex justify-center align-middle gap-2 pt-3 mt-2 border-t">
    <div className="flex flex-1 justify-stretch">
      <Input
        className="w-full"
        value={deviceInfo.url}
        onChange={(event) => setDeviceInfo({ ...deviceInfo, url: event.target.value })}
        placeholder={MESSAGES.device.urlInputPlaceholder}
      />
    </div>
    <div className="flex flex-1 justify-stretch">
      <Input
        className="w-full"
        value={deviceInfo.label ?? ''}
        onChange={(event) => setDeviceInfo({ ...deviceInfo, label: event.target.value })}
        placeholder={MESSAGES.device.labelInputPlaceholder}
      />
    </div>
    <div className="flex">
      <Button
        disabled={deviceInfo.url.length === 0}
        onClick={() => {
          updateDevice(deviceInfo);
          setDeviceInfo({ url: '', label: '' });
        }}
      >
        {MESSAGES.common.save}
      </Button>
    </div>
  </div>
);

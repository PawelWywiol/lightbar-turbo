import { useCallback, useState } from 'react';

import { useConnectedDevices } from 'devices/devices.provider';
import { DialogWrapper } from 'ui/dialog';
import { MESSAGES } from 'config/messages';

import { ConnectedDeviceItem } from './connectedDeviceItem';
import { ConnectedDevicesEmptyListInfo } from './connectedDevicesEmptyListInfo';
import { ConnectedDeviceEditor } from './connectedDeviceEditor';

import type { ConnectedDevice } from 'devices/devices.types';
import type { ConnectedDeviceValidationSchema } from 'devices/devices.schema';

export const ConnectedDevicesDialog = () => {
  const {
    devices,
    updateDevice,
    removeDevice,
    findDevices,
    scanProgress,
    selectedDevice,
    selectDevice,
  } = useConnectedDevices();

  const [deviceInfo, setDeviceInfo] = useState<ConnectedDeviceValidationSchema>({
    url: '',
    label: '',
  });

  const handleSelect = useCallback(
    (url: string) => {
      selectDevice(url);
    },
    [selectDevice],
  );

  const handleEdit = useCallback((device: ConnectedDeviceValidationSchema) => {
    setDeviceInfo(device);
  }, []);

  const handleDelete = useCallback(
    (device: ConnectedDevice) => {
      removeDevice(device.url);
    },
    [removeDevice],
  );

  return (
    <DialogWrapper
      trigger={<span>{MESSAGES.device.triggerDialogLabel}</span>}
      title={MESSAGES.device.dialogHeader}
    >
      <div className="flex flex-col gap-2">
        {devices.length > 0 ? (
          devices.map((device) => (
            <ConnectedDeviceItem
              key={device.url}
              device={device}
              isSelected={selectedDevice?.url === device.url}
              onSelect={handleSelect}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <ConnectedDevicesEmptyListInfo findDevices={findDevices} scanProgress={scanProgress} />
        )}
      </div>
      <ConnectedDeviceEditor
        deviceInfo={deviceInfo}
        setDeviceInfo={setDeviceInfo}
        updateDevice={updateDevice}
      />
    </DialogWrapper>
  );
};

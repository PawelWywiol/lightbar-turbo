'use client';

import { useState } from 'react';

import { MESSAGES } from 'config/messages';
import { Button } from 'ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'ui/dialog';
import { DropDownMenuWrapper } from 'ui/dropdownMenu';
import { useConnectedDevices } from 'devices/devices.provider';

import { ConnectedDeviceEditor } from './connectedDeviceEditor';
import { ConnectedDevicesEmptyListInfo } from './connectedDevicesEmptyListInfo';
import { ConnectedDeviceInfo } from './connectedDeviceInfo';

import type { ConnectedDeviceValidationSchema } from 'devices/devices.schema';

export const ConnectedDevicesDialog = () => {
  const { devices, updateDevice, removeDevice, findDevices, scanProgress, selected, select } =
    useConnectedDevices();
  const [deviceInfo, setDeviceInfo] = useState<ConnectedDeviceValidationSchema | undefined>();

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{MESSAGES.device.triggerDialogLabel}</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col justify-center align-middle max-w-[fit-content] gap-4">
        <h2>{MESSAGES.device.dialogHeader}</h2>
        <div className="flex flex-col gap-2">
          {devices.map((device) => (
            <div key={device.url} className="flex justify-center align-middle text-left gap-4">
              <Button
                className="flex flex-1 justify-stretch p-2"
                variant={selected === device.url ? 'outline' : 'ghost'}
                onClick={() => select(device.url)}
              >
                <ConnectedDeviceInfo device={device} />
              </Button>
              <div className="flex gap-2 justify-center align-middle">
                <DropDownMenuWrapper
                  options={[
                    {
                      label: MESSAGES.common.select,
                      onClick: () => select(device.url),
                    },
                    {
                      label: MESSAGES.common.edit,
                      onClick: () => setDeviceInfo(device),
                    },
                    {
                      label: MESSAGES.common.delete,
                      onClick: () => removeDevice(device),
                    },
                  ]}
                />
              </div>
            </div>
          ))}
          {devices.length === 0 && (
            <ConnectedDevicesEmptyListInfo findDevices={findDevices} scanProgress={scanProgress} />
          )}
        </div>
        {deviceInfo && (
          <ConnectedDeviceEditor
            deviceInfo={deviceInfo}
            setDeviceInfo={setDeviceInfo}
            updateDevice={updateDevice}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

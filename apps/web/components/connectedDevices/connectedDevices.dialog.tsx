'use client';

import { useState } from 'react';

import { MESSAGES } from 'config/messages';
import { Button } from 'ui/button';
import { Dialog } from 'ui/dialog';
import { TextField } from 'ui/textField';
import { DropDownMenu } from 'ui/dropdownMenu';

import { useConnectedDevices } from './connectedDevices.hooks';

import type { ConnectedDeviceValidationSchema } from './connectedDevices.schema';

export const ConnectedDevicesDialog = () => {
  const { devices, updateDevice } = useConnectedDevices();
  const [deviceInfo, setDeviceInfo] = useState<ConnectedDeviceValidationSchema>({
    url: '',
    label: '',
  });

  return (
    <Dialog
      className="flex flex-col justify-center align-middle max-w-[fit-content] gap-4"
      trigger={<Button>{MESSAGES.device.triggerDialogLabel}</Button>}
    >
      <h2>{MESSAGES.device.dialogHeader}</h2>
      <div className="flex flex-col gap-2">
        {devices.map(({ url, label }) => (
          <div key={url} className="flex justify-center align-middle gap-2">
            <div className="flex flex-1 justify-stretch">{label}</div>
            <div className="flex gap-2 justify-center align-middle">
              <DropDownMenu
                options={[
                  {
                    label: MESSAGES.common.edit,
                    onClick: () => setDeviceInfo({ url, label }),
                  },
                  {
                    label: MESSAGES.common.delete,
                    onClick: () => updateDevice({ url, label }),
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center align-middle gap-2">
        <div className="flex flex-1 justify-stretch">
          <TextField
            className="w-full"
            value={deviceInfo.url}
            onChange={(url) => setDeviceInfo({ ...deviceInfo, url })}
            placeholder={MESSAGES.device.urlInputPlaceholder}
          />
        </div>
        <div className="flex flex-1 justify-stretch">
          <TextField
            className="w-full"
            value={deviceInfo.label}
            onChange={(label) => setDeviceInfo({ ...deviceInfo, label })}
            placeholder={MESSAGES.device.labelInputPlaceholder}
          />
        </div>
        <div className="flex">
          <Button
            disabled={deviceInfo.url.length === 0 || deviceInfo.label.length === 0}
            onClick={() => {
              updateDevice(deviceInfo);
              setDeviceInfo({ url: '', label: '' });
            }}
          >
            {MESSAGES.common.save}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

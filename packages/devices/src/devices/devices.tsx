import { useEffect } from 'react';

import { MESSAGES } from 'config/messages';
import { formatBytes } from 'utils/formatBytes';
import { subscribeCustomEvent, unsubscribeCustomEvent } from 'utils/customEvent';

import { useConnectedDeviceData } from './devices.hooks';
import { connectedDeviceInfoStatus } from './devices.styled';
import {
  editorColorUpdatedToConnectionRequest,
  lightsSchemeColorsToConnectionRequest,
  lightsSchemeFrameToConnectionRequest,
} from './utils/lightsSchemeToConnectionRequest';

import type { CustomEventCallback } from 'utils/customEvent.types';
import type { ConnectedDevice } from './devices.types';
import {
  SaveSchemeDeviceEvent,
  UpdateColorDeviceEvent,
  UpdateSchemeDeviceEvent,
} from './devices.events';

// TODO: replace with devices based on the fetch api
export const ConnectedDeviceWebSocket = ({
  device,
  onChange,
  selected,
}: {
  device: ConnectedDevice;
  onChange: ({ info, status }: ConnectedDevice) => void;
  selected: boolean;
}) => {
  const { info, status, send } = useConnectedDeviceData(device);

  useEffect(() => {
    onChange({ ...device, info, status });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, status]);

  useEffect(() => {
    const editorSchemeUpdateEvent: CustomEventCallback<UpdateSchemeDeviceEvent> = {
      name: 'app:update:scheme',
      callback: ({ detail }) => {
        const frame = detail.scheme.frames[detail.frameIndex];
        if (!frame) {
          return;
        }

        const jsonl = [
          lightsSchemeColorsToConnectionRequest(detail.scheme.colors),
          lightsSchemeFrameToConnectionRequest(frame, info?.data.leds),
        ].join('\n');

        send(jsonl);
      },
    };
    const editorColorUpdateEvent: CustomEventCallback<UpdateColorDeviceEvent> = {
      name: 'app:update:color',
      callback: ({ detail }) => {
        if (!detail) {
          return;
        }

        const jsonl = editorColorUpdatedToConnectionRequest(detail, info?.data.leds);

        send(jsonl);
      },
    };
    const editorSchemeSaveEvent: CustomEventCallback<SaveSchemeDeviceEvent> = {
      name: 'app:save:scheme',
      callback: ({ detail: { scheme } }) => {
        const jsonl = [
          lightsSchemeColorsToConnectionRequest(scheme.colors),
          ...scheme.frames.map((frame) =>
            lightsSchemeFrameToConnectionRequest(frame, info?.data.leds),
          ),
        ].join('\n');

        send(jsonl);
      },
    };

    if (selected) {
      subscribeCustomEvent<UpdateSchemeDeviceEvent>(editorSchemeUpdateEvent);
      subscribeCustomEvent<UpdateColorDeviceEvent>(editorColorUpdateEvent);
      subscribeCustomEvent<SaveSchemeDeviceEvent>(editorSchemeSaveEvent);
    }

    return () => {
      unsubscribeCustomEvent<UpdateSchemeDeviceEvent>(editorSchemeUpdateEvent);
      unsubscribeCustomEvent<UpdateColorDeviceEvent>(editorColorUpdateEvent);
      unsubscribeCustomEvent<SaveSchemeDeviceEvent>(editorSchemeSaveEvent);
    };
  }, [info, selected, send]);

  return null;
};

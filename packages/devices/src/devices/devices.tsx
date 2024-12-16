import { useEffect } from 'react';

import { subscribeCustomEvent, unsubscribeCustomEvent } from 'utils/customEvent';

import { useConnectedDeviceData } from './devices.hooks';

import type {
  SaveSchemeDeviceEvent,
  UpdateColorDeviceEvent,
  UpdateSchemeDeviceEvent,
} from './devices.events';
import type { CustomEventCallback } from 'utils/customEvent.types';
import type { ConnectedDevice } from './devices.types';

export const ConnectedDeviceResolver = ({
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

    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info, status]);

  useEffect(() => {
    const editorColorUpdateEvent: CustomEventCallback<UpdateColorDeviceEvent> = {
      name: 'app:update:color',
      callback: ({ detail }) => {
        if (!detail) {
          return;
        }

        // const jsonl = editorColorUpdatedToConnectionRequest(detail, info?.data.leds);

        // void send(jsonl);
      },
    };

    const editorSchemeUpdateEvent: CustomEventCallback<UpdateSchemeDeviceEvent> = {
      name: 'app:update:scheme',
      callback: ({ detail }) => {
        const frame = detail.scheme.frames[detail.frameIndex];
        if (!frame) {
          return;
        }

        // const jsonl = [
        //   lightsSchemeColorsToConnectionRequest(detail.scheme.colors),
        //   lightsSchemeFrameToConnectionRequest(frame, info?.data.leds),
        // ].join('\n');

        // void send(jsonl);
      },
    };

    const editorSchemeSaveEvent: CustomEventCallback<SaveSchemeDeviceEvent> = {
      name: 'app:save:scheme',
      callback: ({
        detail: {
          // scheme
        },
      }) => {
        // const jsonl = [
        //   lightsSchemeColorsToConnectionRequest(scheme.colors),
        //   ...scheme.frames.map((frame) =>
        //     lightsSchemeFrameToConnectionRequest(frame, info?.data.leds),
        //   ),
        // ].join('\n');
        // void send(jsonl);
      },
    };

    if (selected) {
      subscribeCustomEvent<UpdateColorDeviceEvent>(editorColorUpdateEvent);
      subscribeCustomEvent<UpdateSchemeDeviceEvent>(editorSchemeUpdateEvent);
      subscribeCustomEvent<SaveSchemeDeviceEvent>(editorSchemeSaveEvent);
    }

    return () => {
      unsubscribeCustomEvent<UpdateColorDeviceEvent>(editorColorUpdateEvent);
      unsubscribeCustomEvent<UpdateSchemeDeviceEvent>(editorSchemeUpdateEvent);
      unsubscribeCustomEvent<SaveSchemeDeviceEvent>(editorSchemeSaveEvent);
    };
  }, [info, selected, send]);

  return null;
};

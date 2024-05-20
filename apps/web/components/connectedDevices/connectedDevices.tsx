import { useEffect } from 'react';

import { MESSAGES } from 'config/messages';
import { formatBytes } from 'utils/formatBytes';
import { subscribeCustomEvent, unsubscribeCustomEvent } from 'utils/customEvent';

import { useConnectedDeviceData } from './connectedDevices.hooks';
import { connectedDeviceInfoStatus } from './connectedDevices.styled';
import {
  editorColorUpdatedToConnectionRequest,
  lightsSchemeColorsToConnectionRequest,
  lightsSchemeFrameToConnectionRequest,
} from './utils/lightsSchemeToConnectionRequest';

import type { CustomEventCallback } from 'utils/customEvent.types';
import type { ConnectedDevice } from './connectedDevices.types';
import type {
  EditorColorUpdateEvent,
  EditorSchemeSaveEvent,
  EditorSchemeUpdateEvent,
} from '../editor/editor.types';

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
    const editorSchemeUpdateEvent: CustomEventCallback<EditorSchemeUpdateEvent> = {
      name: 'app:editor:scheme:update',
      callback: ({ detail }) => {
        const frame = detail.scheme.frames[detail.frameIndex];
        if (!frame) {
          return;
        }

        const jsonl = [
          lightsSchemeColorsToConnectionRequest(detail.scheme.colors),
          lightsSchemeFrameToConnectionRequest(frame, info?.data.leds),
        ].join('\n');

        void send(jsonl);
      },
    };
    const editorColorUpdateEvent: CustomEventCallback<EditorColorUpdateEvent> = {
      name: 'app:editor:color:update',
      callback: ({ detail }) => {
        if (!detail) {
          return;
        }

        const jsonl = editorColorUpdatedToConnectionRequest(detail, info?.data.leds);

        void send(jsonl);
      },
    };
    const editorSchemeSaveEvent: CustomEventCallback<EditorSchemeSaveEvent> = {
      name: 'app:editor:scheme:save',
      callback: ({ detail: { scheme } }) => {
        const jsonl = [
          lightsSchemeColorsToConnectionRequest(scheme.colors),
          ...scheme.frames.map((frame) =>
            lightsSchemeFrameToConnectionRequest(frame, info?.data.leds),
          ),
        ].join('\n');

        void send(jsonl);
      },
    };

    if (selected) {
      subscribeCustomEvent<EditorSchemeUpdateEvent>(editorSchemeUpdateEvent);
      subscribeCustomEvent<EditorColorUpdateEvent>(editorColorUpdateEvent);
      subscribeCustomEvent<EditorSchemeSaveEvent>(editorSchemeSaveEvent);
    }

    return () => {
      unsubscribeCustomEvent<EditorSchemeUpdateEvent>(editorSchemeUpdateEvent);
      unsubscribeCustomEvent<EditorColorUpdateEvent>(editorColorUpdateEvent);
      unsubscribeCustomEvent<EditorSchemeSaveEvent>(editorSchemeSaveEvent);
    };
  }, [info, selected, send]);

  return null;
};

export const ConnectedDeviceInfo = ({
  device: { status, label, info, url },
}: {
  device: ConnectedDevice;
}) => {
  return (
    <div className="flex gap-4 flex-1 align-middle items-center text-left">
      <span className={connectedDeviceInfoStatus({ status })} />
      <span className="flex-1 flex flex-col gap-1">
        <span>{label ?? info?.data.ap ?? url}</span>
        <span className="text-xs">
          {info?.message ??
            MESSAGES.connection[
              (status?.toLocaleLowerCase() as keyof typeof MESSAGES.connection) ?? 'closed'
            ]}
        </span>
      </span>
      {info && (
        <span className="text-xs flex flex-col gap-1 text-right">
          <span>
            {info.data.leds} {MESSAGES.device.leds}
          </span>
          <span>{formatBytes(info.data.space)}</span>
        </span>
      )}
    </div>
  );
};

import type { LightsFrame } from '../lights/lights.types';
import type { Message } from 'config/messages.types';

export type ConnectionType = 'CLOSED' | 'CONNECTING' | 'CONNECTED' | 'PROCESSING';
export enum NetworkType {
  Unknown = 0,
  STA = 1,
  AP = 2,
}

export type ConnectionCustomEventDispatch =
  | {
      name: 'app:connection:status';
      detail: {
        target: string;
        status: ConnectionType;
      };
    }
  | {
      name: 'app:connection:message';
      detail: {
        target: string;
        message?: Message | undefined;
      };
    };

export interface ConnectionRequestData {
  type: 'wifi';
  data: {
    ssid: string;
    pass: string;
  };
}

export interface ConnectionResponseData {
  type: 'info';
  message: string;
  network: NetworkType;
  data: {
    leds: number;
    ap: string;
    space: number;
    heap: number;
  };
}

export type ConnectionRequestLightsSchemeData =
  | {
      type: 'colors';
      data: {
        colors: number[];
      };
    }
  | {
      type: 'frame';
      data: {
        type: LightsFrame['type'];
        tempo: LightsFrame['tempo'];
        colors: LightsFrame['colorIndexes'];
      };
    };

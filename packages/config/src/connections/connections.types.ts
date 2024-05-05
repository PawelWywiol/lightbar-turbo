import type { LightsFrame } from '../lights/lights.types';
import type { Message } from '../messages/messages.types';

export type ConnectionType = 'CLOSED' | 'CONNECTING' | 'CONNECTED';
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
  type: 'WIFI';
  data: {
    ssid: string;
    pass: string;
  };
}

export interface ConnectionResponseData {
  type: 'INFO';
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
      type: 'COLORS';
      data: {
        colors: number[];
      };
    }
  | {
      type: 'FRAME';
      data: {
        type: LightsFrame['type'];
        tempo: LightsFrame['tempo'];
        colors: LightsFrame['colorIndexes'];
      };
    };

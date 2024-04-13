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
  msg: string;
  net: NetworkType;
  data: {
    ver: string;
    sdk: string;
    uid: string;
    ssid: string;
    free: number;
    leds: number;
  };
}

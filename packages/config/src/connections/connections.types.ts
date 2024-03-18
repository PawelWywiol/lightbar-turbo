import type { Message } from '../messages/messages.types';

export type ConnectionType = 'CLOSED' | 'CONNECTING' | 'CONNECTED';

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
    password: string;
  };
}

export interface ConnectionResponseData {
  type: 'INFO';
  data: {
    msg: string;
    ap: string;
    ip: string;
    app: string;
    ver: string;
    rev: string;
    sdk: string;
    uid: string;
    free: string;
    ssid: string;
    leds: string;
  };
}

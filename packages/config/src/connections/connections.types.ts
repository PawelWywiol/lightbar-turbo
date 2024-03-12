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

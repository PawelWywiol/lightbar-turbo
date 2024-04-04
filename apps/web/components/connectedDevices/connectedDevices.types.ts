import type { ConnectionResponseData, ConnectionType } from 'config/connections.types';

export interface ConnectedDevice {
  url: string;
  label: string;
  status?: ConnectionType | undefined;
  info?: ConnectionResponseData | undefined;
}

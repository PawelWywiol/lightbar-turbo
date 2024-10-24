export const CONNECTED_DEVICES_STORAGE_KEY = (type: 'devices' | 'selected') =>
  `connectedDevices:${type}`;
export const CONNECTED_DEVICE_API_DEFAULT_SCHEMA = 'http';
export const CONNECTED_DEVICE_API_DEFAULT_PATH = '/api';
export const CONNECTED_DEVICE_API_DEFAULT_URL = '/api';
export const CONNECTED_DEVICE_GET_STATE_INTERVAL = 30_000;
export const CONNECTED_DEVICES_MAX_COUNT = 255;

export const SUBNETS_IPS = Object.entries({
  '10.0.0': ['1', '138', '2'],
  '10.1.1': ['1'],
  '10.1.10': ['1'],
  '10.10.1': ['1'],
  '10.90.90': ['90'],
  '192.168.0': ['1', '10', '100', '101', '227', '254', '3', '30', '50'],
  '192.168.1': ['10', '100', '20', '200', '210', '254', '99'],
  '192.168.10': ['10', '100', '50'],
  '192.168.100': ['100'],
  '192.168.123': ['254'],
  '192.168.168': ['168'],
  '192.168.2': ['254'],
  '192.168.223': ['100'],
  '192.168.254': ['254'],
  '200.200.200': ['5'],
}).flatMap(([ip, parts]) => parts.map((part) => `${ip}.${part}`));

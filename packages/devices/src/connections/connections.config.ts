import type { ConnectionRequestDataType } from './connections.types';

export const CONNECTION_REQUEST_TYPE: Record<ConnectionRequestDataType, number> = {
  wifi: 0x77_69_66_69,
  colors: 0x63_6f_6c_6f,
  frame: 0x66_72_61_6d,
};
export const CONNECTION_REQUEST_TYPE_INFO_LENGTH = 4;
export const CONNECTION_REQUEST_SIZE_INFO_LENGTH = 4;

const TRAILING_ZERO_LENGTH = 1;
export const SSID_MAX_LENGTH = 32 + TRAILING_ZERO_LENGTH;
export const PASSWORD_MAX_LENGTH = 64 + TRAILING_ZERO_LENGTH;

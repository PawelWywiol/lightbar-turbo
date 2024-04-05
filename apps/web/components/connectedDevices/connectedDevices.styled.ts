import { cva } from 'cva';

export const connectedDeviceInfoStatus = cva('aspect-square rounded-full h-4', {
  variants: {
    status: {
      CONNECTING: 'bg-warning',
      CONNECTED: 'bg-success',
      CLOSED: 'bg-error',
    },
  },
  defaultVariants: {
    status: 'CLOSED',
  },
});

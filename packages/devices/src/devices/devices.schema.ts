import { z } from 'zod';

export const ConnectedDeviceValidationSchema = z.object({
  url: z.string(),
  label: z.string().optional(),
});

export const ConnectedDevicesValidationSchema = z.array(ConnectedDeviceValidationSchema);

export type ConnectedDeviceInput = z.infer<typeof ConnectedDeviceValidationSchema>;
export type ConnectedDevicesInput = z.infer<typeof ConnectedDevicesValidationSchema>;

export const ConnectedDeviceUrlValidationSchema = z.string().optional();

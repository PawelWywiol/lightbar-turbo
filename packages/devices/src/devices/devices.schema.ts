import { z } from 'zod';

export const ConnectedDeviceValidationSchema = z.object({
  url: z.string(),
  label: z.string().optional(),
});

export const ConnectedDevicesValidationSchema = z.array(ConnectedDeviceValidationSchema);

export type ConnectedDeviceValidationSchema = z.infer<typeof ConnectedDeviceValidationSchema>;

export const ConnectedDeviceUrlValidationSchema = z.string();

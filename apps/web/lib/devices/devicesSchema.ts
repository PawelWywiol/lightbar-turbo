import { z } from 'zod';

export const DeviceUrlSchema = z
  .string()
  .min(1, 'URL is required')
  .refine(
    (url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
      } catch {
        return false;
      }
    },
    { message: 'Must be a valid HTTP/HTTPS URL' },
  );

export const ConnectedDeviceValidationSchema = z.object({
  url: z.string(),
  label: z.string().optional(),
});

export const ConnectedDevicesValidationSchema = z.array(ConnectedDeviceValidationSchema);

export type ConnectedDeviceInput = z.infer<typeof ConnectedDeviceValidationSchema>;
export type ConnectedDevicesInput = z.infer<typeof ConnectedDevicesValidationSchema>;

export const ConnectedDeviceUrlValidationSchema = z.string().optional();

export const validateDeviceUrl = (url: string): { valid: boolean; error?: string | undefined } => {
  const result = DeviceUrlSchema.safeParse(url);
  return result.success
    ? { valid: true }
    : { valid: false, error: result.error.issues[0]?.message };
};

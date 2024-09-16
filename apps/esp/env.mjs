/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const env = {
  DEFAULT_HOST_DEVICE_URL: import.meta.env.VITE_DEFAULT_HOST_DEVICE_URL,
};

export { env };

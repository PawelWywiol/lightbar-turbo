/**
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const env = {
  DEFAULT_WS_URL: import.meta.env.VITE_DEFAULT_WS_URL,
};

export { env };

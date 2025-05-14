/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_HOST_DEVICE_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

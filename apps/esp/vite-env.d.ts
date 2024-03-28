/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_WS_URL: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

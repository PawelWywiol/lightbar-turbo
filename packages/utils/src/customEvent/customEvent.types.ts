export interface CustomEventCallback {
  name: string;
  callback: (event: CustomEvent<unknown>) => void;
}

export interface CustomEventDispatch {
  name: string;
  detail: unknown;
}

import type { CustomEventCallback, CustomEventDispatch } from './customEvent.types';

export const subscribeCustomEvent = (customEvent: CustomEventCallback): void => {
  if (document === undefined) return;

  document.addEventListener(customEvent.name, customEvent.callback as EventListener);
};

export const unsubscribeCustomEvent = (customEvent: CustomEventCallback): void => {
  if (document === undefined) return;

  document.removeEventListener(customEvent.name, customEvent.callback as EventListener);
};

export const dispatchCustomEvent = (customEvent: CustomEventDispatch): void => {
  if (document === undefined) return;

  document.dispatchEvent(
    new CustomEvent(customEvent.name, {
      detail: customEvent.detail as CustomEventInit<typeof customEvent.detail>,
    }),
  );
};

import type { RafCallback, RafLoop } from './rafTimeout.types';

export const initializeCurrentTime = (time: number, currentTime: number): number => {
  return currentTime === -1 ? time : currentTime;
};

export const isTimeoutReached = (time: number, currentTime: number, timeout: number): boolean => {
  return time - currentTime > timeout;
};

export const createRafLoop = (
  callback: RafCallback,
  timeout: number,
  currentTime: number,
): RafLoop => {
  return (time: number) => {
    currentTime = initializeCurrentTime(time, currentTime);

    if (isTimeoutReached(time, currentTime, timeout)) {
      callback();
      currentTime = -1;
    } else {
      requestAnimationFrame(createRafLoop(callback, timeout, currentTime));
    }
  };
};

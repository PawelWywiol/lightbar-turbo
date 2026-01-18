import { hexToRGB } from 'utils/hexToRGB';
import { rafTimeout } from 'utils/rafTimeout';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('hexToRGB', () => {
  it('should convert 6-digit hex with # to RGB tuple', () => {
    expect(hexToRGB('#ff0000')).toEqual([255, 0, 0]);
    expect(hexToRGB('#00ff00')).toEqual([0, 255, 0]);
    expect(hexToRGB('#0000ff')).toEqual([0, 0, 255]);
  });

  it('should convert hex without # to RGB tuple', () => {
    expect(hexToRGB('ff0000')).toEqual([255, 0, 0]);
  });

  it('should handle lowercase hex', () => {
    expect(hexToRGB('#abcdef')).toEqual([171, 205, 239]);
  });

  it('should handle uppercase hex', () => {
    expect(hexToRGB('#ABCDEF')).toEqual([171, 205, 239]);
  });

  it('should convert white', () => {
    expect(hexToRGB('#ffffff')).toEqual([255, 255, 255]);
  });

  it('should convert black', () => {
    expect(hexToRGB('#000000')).toEqual([0, 0, 0]);
  });
});

describe('rafTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(globalThis, 'requestAnimationFrame').mockImplementation((cb) => {
      return setTimeout(() => cb(performance.now()), 16) as unknown as number;
    });
    vi.spyOn(globalThis, 'cancelAnimationFrame').mockImplementation((id) => {
      clearTimeout(id);
    });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should return a cancel function', () => {
    const callback = vi.fn();
    const cancel = rafTimeout(callback, 100);
    expect(typeof cancel).toBe('function');
    cancel();
  });

  it('should call callback after timeout', async () => {
    const callback = vi.fn();
    rafTimeout(callback, 50);

    await vi.advanceTimersByTimeAsync(100);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should not call callback when cancelled', async () => {
    const callback = vi.fn();
    const cancel = rafTimeout(callback, 100);

    cancel();
    await vi.advanceTimersByTimeAsync(200);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should call callback immediately when timeout is 0', async () => {
    const callback = vi.fn();
    rafTimeout(callback, 0);

    await vi.advanceTimersByTimeAsync(20);

    expect(callback).toHaveBeenCalled();
  });
});

/* eslint-disable unicorn/filename-case */
export const hexToRGB = (hex: string) => {
  const hexNumber = Number.parseInt(hex.replace('#', ''), 16);
  const r = hexNumber >> 16;
  const g = (hexNumber >> 8) & 0xff;
  const b = hexNumber & 0xff;

  return [r, g, b];
};

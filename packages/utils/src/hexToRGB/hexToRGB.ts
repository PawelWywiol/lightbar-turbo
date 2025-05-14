/* eslint-disable unicorn/filename-case */
import { COLOR_MASK, GREEN_SHIFT, HEX_BASE, RED_SHIFT } from './hexToRGB.config';

export const hexToRGB = (hex: string): [number, number, number] => {
  const sanitizedHex = hex.replace('#', '');
  const hexNumber = Number.parseInt(sanitizedHex, HEX_BASE);

  const r = (hexNumber >> RED_SHIFT) & COLOR_MASK;
  const g = (hexNumber >> GREEN_SHIFT) & COLOR_MASK;
  const b = hexNumber & COLOR_MASK;

  return [r, g, b];
};

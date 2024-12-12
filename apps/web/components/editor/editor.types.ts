import type { LightsSchemeData } from 'devices/lights.types';

export type ShiftDirection = 'up' | 'down' | 'left' | 'right' | 'prev' | 'next' | 'shuffle';

export interface FrameShifter {
  shift(
    frame: number[],
    direction: ShiftDirection,
    rowsCount: number,
    columnsCount: number,
  ): number[];
}

export interface EditorProps {
  lightsSchemeData?: LightsSchemeData | undefined;
}

export interface EditorColorPalette {
  color: string;
  index: number;
}

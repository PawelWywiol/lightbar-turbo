import type { LightsScheme, LightsSchemeData } from 'devices/lights.types';

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

export interface EditorSchemeUpdateEvent {
  name: 'app:editor:scheme:update';
  detail: {
    scheme: LightsScheme;
    frameIndex: number;
  };
}

export interface EditorColorUpdateEvent {
  name: 'app:editor:color:update';
  detail: {
    colorIndex: number | undefined;
  };
}

export interface EditorSchemeSaveEvent {
  name: 'app:editor:scheme:save';
  detail: {
    uid: string;
    scheme: LightsScheme;
  };
}

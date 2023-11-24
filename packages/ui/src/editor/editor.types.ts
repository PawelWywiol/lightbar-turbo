import type { LightsScheme } from 'config';

export type ShiftDirection = 'up' | 'down' | 'left' | 'right' | 'prev' | 'next' | 'shuffle';

export interface EditorProps {
  scheme: LightsScheme;
  setScheme: (scheme: LightsScheme) => void;
}

export interface EditorFrameProps extends EditorProps {
  frameIndex: number;
  nextFrame?: () => void;
  previousFrame?: () => void;
}

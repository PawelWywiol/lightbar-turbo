import type { LightsScheme } from 'config';

export interface EditorProps {
  scheme: LightsScheme;
  setScheme: (scheme: LightsScheme) => void;
}

export interface EditorFrameProps extends EditorProps {
  frameIndex: number;
}

import type { Device, LightsScheme } from 'config';

export type ShiftDirection = 'up' | 'down' | 'left' | 'right' | 'prev' | 'next' | 'shuffle';

export interface EditorProps {
  scheme: LightsScheme;
  handleUpdate: (scheme: LightsScheme) => void;
  undoAvailable: boolean;
  handleUndo: () => void;
  redoAvailable: boolean;
  handleRedo: () => void;
  device: Device;
  setDevice: (device: Device) => void;
}

export interface EditorFrameProps extends Pick<EditorProps, 'scheme' | 'handleUpdate'> {
  frameIndex: number;
  nextFrame?: () => void;
  previousFrame?: () => void;
}

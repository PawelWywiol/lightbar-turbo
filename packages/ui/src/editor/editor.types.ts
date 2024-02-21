import type { Device } from 'config/devices.types';
import type { LightsScheme, LightsSchemeData } from 'config/lights.types';

export type ShiftDirection = 'up' | 'down' | 'left' | 'right' | 'prev' | 'next' | 'shuffle';

export interface EditorProps {
  schemeData: LightsSchemeData;
  device: Device;
  setDevice: (device: Device) => void;
  handleSave: (schemeData: LightsSchemeData) => void;
}

export interface EditorFrameProps {
  scheme: LightsScheme;
  handleUpdate: (newScheme: LightsScheme) => void;
  frameIndex: number;
  nextFrame?: () => void;
  previousFrame?: () => void;
}

import type { Device, LightsScheme } from 'config';

export interface LightsFrameGridProps {
  scheme: LightsScheme;
  handleUpdate: (scheme: LightsScheme) => void;
  device: Device;
  frameIndex: number;
  colorIndex: number;
}

import type { Device } from 'config/devices.types';
import type { LightsScheme } from 'config/lights.types';

export interface LightsFrameGridProps {
  scheme: LightsScheme;
  handleUpdate: (scheme: LightsScheme) => void;
  device: Device;
  frameIndex: number;
  colorIndex: number;
}

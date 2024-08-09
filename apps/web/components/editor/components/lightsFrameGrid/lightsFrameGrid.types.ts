import type { Device } from 'devices/devices.types';
import type { LightsScheme } from 'devices/lights.types';

export interface LightsFrameGridProps {
  scheme: LightsScheme;
  handleUpdate: (scheme: LightsScheme) => void;
  device: Device;
  frameIndex: number;
  colorIndex: number;
}

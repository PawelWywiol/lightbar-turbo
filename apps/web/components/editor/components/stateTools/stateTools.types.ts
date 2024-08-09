import type { LightsScheme } from 'devices/lights.types';

export interface StateToolsProps {
  scheme: LightsScheme;
  handleUpdate: (scheme: LightsScheme) => void;
  undoAvailable: boolean;
  handleUndo: () => void;
  redoAvailable: boolean;
  handleRedo: () => void;
  handleSave: () => void;
}

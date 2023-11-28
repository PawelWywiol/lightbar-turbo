import type { LightsScheme } from 'config';

export interface StateToolsProps {
  scheme: LightsScheme;
  handleUpdate: (scheme: LightsScheme) => void;
  undoAvailable: boolean;
  handleUndo: () => void;
  redoAvailable: boolean;
  handleRedo: () => void;
}

import type { EditorToolType } from '../../editor.config';
import type { ShiftDirection } from '../../editor.types';

export interface EditToolsProps {
  tool: EditorToolType;
  setTool: (tool: EditorToolType) => void;
  colorIndex: number;
  setColorIndex: (colorIndex: number) => void;
  colors: string[];
  shiftLightsFrameColorPixel: (direction: ShiftDirection) => void;
  setColorDialogOpen: (open: boolean) => void;
}

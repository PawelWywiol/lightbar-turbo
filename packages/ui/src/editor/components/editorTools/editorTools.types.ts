import type { EditorToolType } from '../../editor.config';

export interface EditorToolsProps {
  tool: EditorToolType;
  setTool: (tool: EditorToolType) => void;
  colorIndex: number;
  setColorIndex: (colorIndex: number) => void;
  colors: string[];
}

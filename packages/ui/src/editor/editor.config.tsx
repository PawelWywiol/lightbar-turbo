import { MoveIcon, PencilIcon } from '../icons/icons';

export const EDITOR_TOOLS = {
  pencil: {
    value: 'pencil',
    label: 'Pencil',
    icon: <PencilIcon />,
  },
  move: {
    value: 'move',
    label: 'Move',
    icon: <MoveIcon />,
  },
} as const;

export const EDITOR_TOOLS_LIST = Object.values(EDITOR_TOOLS);

export type EditorToolType = keyof typeof EDITOR_TOOLS;

export const EDITOR_DEFAULT_TOOL: EditorToolType = 'pencil';

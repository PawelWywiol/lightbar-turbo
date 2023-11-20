import { MoveIcon, PencilIcon, ShuffleIcon } from '../icons';

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
  shuffle: {
    value: 'shuffle',
    label: 'Shuffle',
    icon: <ShuffleIcon />,
  },
} as const;

export const EDITOR_TOOLS_LIST = Object.values(EDITOR_TOOLS);

export type EditorToolType = keyof typeof EDITOR_TOOLS;

export const EDITOR_DEFAULT_TOOL: EditorToolType = 'pencil';

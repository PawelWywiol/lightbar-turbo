import type { EditorProps } from '../../editor.types';

export interface EditorToolBarProps extends Pick<EditorProps, 'sizes'> {
  className?: string;
}

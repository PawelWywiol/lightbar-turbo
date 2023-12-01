import type { EditorProps } from '../../editor.types';

export interface LightsFrameGridProps
  extends Pick<EditorProps, 'scheme' | 'handleUpdate' | 'device'> {
  frameIndex: number;
  colorIndex: number;
}

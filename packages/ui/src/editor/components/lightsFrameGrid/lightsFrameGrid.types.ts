import { EditorProps } from '../../editor.types';

export interface LightsFrameGridProps extends Pick<EditorProps, 'scheme' | 'handleUpdate'> {
  frameIndex: number;
  colorIndex: number;
}

import { Container } from '@radix-ui/themes';

import { EditorGrid } from './components/editorGrid/editorGrid';
import { EditorToolBar } from './components/editorToolBar/editorToolBar';

import type { EditorProps } from './editor.types';

export const Editor = ({ sizes }: EditorProps) => (
  <Container size={'1'}>
    <EditorToolBar sizes={sizes} />
    <EditorGrid />
  </Container>
);

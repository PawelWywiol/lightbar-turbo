import { Container } from '@radix-ui/themes';

import { EditorGrid } from './components/editorGrid/editorGrid';
import { EditorToolBar } from './components/editorToolBar/editorToolBar';

import type { EditorProps } from './editor.types';

export const Editor = ({ sizes, scheme, onChange }: EditorProps) => {
  return (
    <Container size={'1'}>
      <EditorToolBar sizes={sizes} scheme={scheme} onChange={onChange} />
      <EditorGrid />
    </Container>
  );
};

import { Container } from '@radix-ui/themes';

import { EditorGrid } from './components/editorGrid/editorGrid';
import { EditorToolBar } from './components/editorToolBar/editorToolBar';

import type { EditorProps } from './editor.types';

export const Editor = ({ scheme, setScheme }: EditorProps) => {
  return (
    <Container size={'1'}>
      <EditorToolBar scheme={scheme} setScheme={setScheme} />
      <EditorGrid scheme={scheme} setScheme={setScheme} />
    </Container>
  );
};

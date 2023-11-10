import { EditorGrid } from './components/editorGrid/editorGrid';
import { EditorToolBar } from './components/editorToolBar/editorToolBar';

import type { EditorProps } from './editor.types';

export const Editor = ({ scheme, setScheme }: EditorProps) => {
  return (
    <div className="m-auto max-w-md w-full flex flex-col gap-4">
      <EditorToolBar scheme={scheme} setScheme={setScheme} />
      <EditorGrid scheme={scheme} setScheme={setScheme} />
    </div>
  );
};

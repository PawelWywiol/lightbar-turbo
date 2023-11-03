import { EditorGrid } from './components/editorGrid/editorGrid';
import { EditorToolBar } from './components/editorToolBar/editorToolBar';
import { editorStyles } from './editor.styles';

export const Editor = () => (
  <div className={editorStyles()}>
    <EditorToolBar />
    <EditorGrid />
  </div>
);

import { Editor } from 'ui';
import { EDITOR_SIZES } from 'config';

const EditorPage = () => {
  return (
    <main className={'container indent'}>
      <Editor sizes={EDITOR_SIZES} />
    </main>
  );
};

export default EditorPage;

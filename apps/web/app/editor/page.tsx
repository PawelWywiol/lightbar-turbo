'use client';

import { Editor } from '../../components/editor/editor';

const EditorPage = () => {
  // const onSave = useCallback(
  //   (updatedSchemeData: LightsSchemeData) => {
  //     postLightsScheme(updatedSchemeData);
  //     router.push(`/editor/${updatedSchemeData.uid}`);
  //   },
  //   [router],
  // );

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      <Editor />
    </main>
  );
};

export default EditorPage;

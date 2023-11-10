'use client';

import { useState } from 'react';

import { Editor } from 'ui';
import { DEFAULT_LIGHTS_SCHEME } from 'config';

const EditorPage = () => {
  const [scheme, setScheme] = useState(DEFAULT_LIGHTS_SCHEME);

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      <Editor scheme={scheme} setScheme={setScheme} />
    </main>
  );
};

export default EditorPage;

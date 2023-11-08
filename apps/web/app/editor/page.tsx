'use client';

import { useState } from 'react';

import { Editor } from 'ui';
import { DEFAULT_LIGHTS_SCHEME, LIGHTS_SIZES } from 'config';

const EditorPage = () => {
  const [scheme, setScheme] = useState(DEFAULT_LIGHTS_SCHEME);

  return (
    <main className={'container indent'}>
      <Editor sizes={LIGHTS_SIZES} scheme={scheme} onChange={setScheme} />
    </main>
  );
};

export default EditorPage;

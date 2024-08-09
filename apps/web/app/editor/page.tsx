'use client';

import { useCallback } from 'react';

import { useRouter } from 'next/navigation';
import { DEFAULT_LIGHTS_SCHEME } from 'devices/lights.config';
import { uid } from 'utils/uid';

import { postLightsScheme } from '../../services/lights/lights';
import { Editor } from '../../components/editor/editor';

import type { LightsSchemeData } from 'devices/lights.types';

const EditorPage = () => {
  const router = useRouter();

  const onSave = useCallback(
    (updatedSchemeData: LightsSchemeData) => {
      postLightsScheme(updatedSchemeData);
      router.push(`/editor/${updatedSchemeData.uid}`);
    },
    [router],
  );

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      <Editor
        schemeData={{
          scheme: DEFAULT_LIGHTS_SCHEME,
          uid: uid(),
          updatedAt: new Date().toISOString(),
        }}
        onSave={onSave}
      />
    </main>
  );
};

export default EditorPage;

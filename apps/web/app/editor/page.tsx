'use client';

import { useCallback, useState } from 'react';

import { redirect } from 'next/navigation';
import { Editor } from 'ui';
import { DEFAULT_DEVICE, DEFAULT_LIGHTS_SCHEME } from 'config';
import { uid } from 'utils';

import { postLightsScheme } from '../../services/lights/lights';

import type { Device, LightsSchemeData } from 'config';

const EditorPage = () => {
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);

  const handleSave = useCallback((updatedSchemeData: LightsSchemeData) => {
    postLightsScheme(updatedSchemeData);
    redirect(`/editor/${updatedSchemeData.uid}`);
  }, []);

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      <Editor
        schemeData={{
          scheme: DEFAULT_LIGHTS_SCHEME,
          uid: uid(),
          updatedAt: new Date().toISOString(),
        }}
        device={device}
        setDevice={setDevice}
        handleSave={handleSave}
      />
    </main>
  );
};

export default EditorPage;

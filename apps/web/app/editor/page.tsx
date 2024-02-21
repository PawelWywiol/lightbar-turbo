'use client';

import { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';
import { DEFAULT_LIGHTS_SCHEME } from 'config/lights';
import { Editor } from 'ui/editor';
import { DEFAULT_DEVICE } from 'config/devices';
import { uid } from 'utils/uid';

import { postLightsScheme } from '../../services/lights/lights';

import type { Device } from 'config/devices.types';
import type { LightsSchemeData } from 'config/lights.types';

const EditorPage = () => {
  const router = useRouter();
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);

  const handleSave = useCallback((updatedSchemeData: LightsSchemeData) => {
    postLightsScheme(updatedSchemeData);
    router.push(`/editor/${updatedSchemeData.uid}`);
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

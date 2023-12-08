'use client';

import { useCallback, useEffect, useState } from 'react';

import { Editor } from 'ui';
import { DEFAULT_DEVICE } from 'config';
import Link from 'next/link';

import { getLightsSchemeData, postLightsScheme } from '../../../services/lights/lights';

import type { Device, LightsSchemeData } from 'config';

const EditorPage = ({ schemeId }: { schemeId: string }) => {
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);
  const [schemeData, setSchemeData] = useState<LightsSchemeData | undefined>();

  useEffect(() => {
    setSchemeData(getLightsSchemeData(schemeId));
  }, [schemeId]);

  const handleSave = useCallback((updatedSchemeData: LightsSchemeData) => {
    postLightsScheme(updatedSchemeData);
  }, []);

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      {schemeData ? (
        <Editor
          schemeData={schemeData}
          device={device}
          setDevice={setDevice}
          handleSave={handleSave}
        />
      ) : (
        <Link href={'/'}>Scheme data not available. Go back to home page.</Link>
      )}
    </main>
  );
};

export default EditorPage;

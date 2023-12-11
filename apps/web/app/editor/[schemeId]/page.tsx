'use client';

import { useCallback, useEffect, useState } from 'react';

import { Editor } from 'ui';
import { DEFAULT_DEVICE, MESSAGES } from 'config';
import Link from 'next/link';

import { getLightsSchemeData, postLightsScheme } from '../../../services/lights/lights';

import type { Device, LightsSchemeData } from 'config';

const EditorPage = ({ params: { schemeId } }: { params: { schemeId: string } }) => {
  const [statusMessage, setStatusMessage] = useState<string>(MESSAGES.scheme.loading);
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);
  const [schemeData, setSchemeData] = useState<LightsSchemeData | undefined>();

  useEffect(() => {
    const loadedSchemeData = getLightsSchemeData(schemeId);
    if (loadedSchemeData) {
      setStatusMessage(MESSAGES.scheme.loaded);
    } else {
      setStatusMessage(`${MESSAGES.scheme.notFound} ${MESSAGES.common.goBackToHomePage}`);
    }
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
        <Link href={'/'}>{statusMessage}</Link>
      )}
    </main>
  );
};

export default EditorPage;

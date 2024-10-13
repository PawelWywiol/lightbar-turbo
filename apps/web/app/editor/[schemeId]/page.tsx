'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { MESSAGES } from 'config/messages';

import { getLightsSchemeData } from '../../../services/lights/lights';
import { Editor } from '../../../components/editor/editor';

import type { LightsSchemeData } from 'devices/lights.types';

const EditorPage = ({ params: { schemeId } }: { params: { schemeId: string } }) => {
  const [statusMessage, setStatusMessage] = useState<string>(MESSAGES.scheme.loading);
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

  // const onSave = useCallback((updatedSchemeData: LightsSchemeData) => {
  //   postLightsScheme(updatedSchemeData);
  // }, []);

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      {schemeData ? (
        <Editor lightsSchemeData={schemeData} />
      ) : (
        <Link href={'/'}>{statusMessage}</Link>
      )}
    </main>
  );
};

export default EditorPage;

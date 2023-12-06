'use client';

import { useCallback, useState } from 'react';

import { Editor } from 'ui';
import { DEFAULT_DEVICE, DEFAULT_LIGHTS_SCHEME } from 'config';
import { uid } from 'utils';

import { postLightsScheme } from '../../services/lights/lights';

import type { Device, LightsScheme, LightsSchemeData } from 'config';

const MAX_HISTORY = 20;

const EditorPage = () => {
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);
  const [scheme, setScheme] = useState(DEFAULT_LIGHTS_SCHEME);
  const [schemeHistory, setSchemeHistory] = useState([scheme]);
  const [schemeHistoryIndex, setSchemeHistoryIndex] = useState(0);

  const handleUpdate = useCallback(
    (newScheme: LightsScheme) => {
      const newSchemeHistory = [...schemeHistory];
      const newSchemeHistoryIndex = schemeHistoryIndex + 1;

      if (newSchemeHistoryIndex < MAX_HISTORY) {
        newSchemeHistory.splice(newSchemeHistoryIndex);
      } else {
        newSchemeHistory.shift();
      }

      newSchemeHistory.push(newScheme);
      setSchemeHistory(newSchemeHistory);
      setSchemeHistoryIndex(newSchemeHistory.length - 1);
      setScheme(newScheme);
    },
    [schemeHistory, schemeHistoryIndex],
  );

  const handleUndo = useCallback(() => {
    const previousScheme = schemeHistory[schemeHistoryIndex - 1];
    if (schemeHistoryIndex > 0 && previousScheme) {
      setSchemeHistoryIndex(schemeHistoryIndex - 1);
      setScheme(previousScheme);
    }
  }, [schemeHistory, schemeHistoryIndex]);

  const handleRedo = useCallback(() => {
    const nextScheme = schemeHistory[schemeHistoryIndex + 1];
    if (schemeHistoryIndex < schemeHistory.length - 1 && nextScheme) {
      setSchemeHistoryIndex(schemeHistoryIndex + 1);
      setScheme(nextScheme);
    }
  }, [schemeHistory, schemeHistoryIndex]);

  const handleSave = useCallback((updatedScheme: LightsScheme) => {
    const lightsSchemeData: LightsSchemeData = {
      uid: uid(),
      scheme: updatedScheme,
      updatedAt: new Date().toISOString(),
    };

    postLightsScheme(lightsSchemeData);
  }, []);

  return (
    <main className={'flex-1 flex justify-center align-middle'}>
      <Editor
        scheme={scheme}
        handleUpdate={handleUpdate}
        undoAvailable={schemeHistoryIndex > 0}
        handleUndo={handleUndo}
        redoAvailable={schemeHistoryIndex < schemeHistory.length - 1}
        handleRedo={handleRedo}
        device={device}
        setDevice={setDevice}
        handleSave={handleSave}
      />
    </main>
  );
};

export default EditorPage;

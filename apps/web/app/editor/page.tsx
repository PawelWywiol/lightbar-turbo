'use client';

import { useState } from 'react';

import { Editor } from 'ui';
import { DEFAULT_DEVICE, DEFAULT_LIGHTS_SCHEME, Device, LightsScheme } from 'config';

const MAX_HISTORY = 20;

const EditorPage = () => {
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);
  const [scheme, setScheme] = useState(DEFAULT_LIGHTS_SCHEME);
  const [schemeHistory, setSchemeHistory] = useState([scheme]);
  const [schemeHistoryIndex, setSchemeHistoryIndex] = useState(0);

  const handleUpdate = (newScheme: LightsScheme) => {
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
  };

  const handleUndo = () => {
    const prevScheme = schemeHistory[schemeHistoryIndex - 1];
    if (schemeHistoryIndex > 0 && prevScheme) {
      setSchemeHistoryIndex(schemeHistoryIndex - 1);
      setScheme(prevScheme);
    }
  };

  const handleRedo = () => {
    const nextScheme = schemeHistory[schemeHistoryIndex + 1];
    if (schemeHistoryIndex < schemeHistory.length - 1 && nextScheme) {
      setSchemeHistoryIndex(schemeHistoryIndex + 1);
      setScheme(nextScheme);
    }
  };

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
      />
    </main>
  );
};

export default EditorPage;

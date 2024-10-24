import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { generateUid } from 'utils/uid';
import { dispatchCustomEvent } from 'utils/customEvent';
import { resolveLightsSchemeColorIndexes } from 'devices/devices.utils';
import { DEFAULT_LIGHTS_LAYOUT_OPTION, DEFAULT_LIGHTS_SCHEME } from 'devices/lights.config';

import { EDITOR_MAX_HISTORY } from './editor.config';

import type { LightsLayoutOption, LightsScheme, LightsSchemeData } from 'devices/lights.types';
import type {
  EditorColorUpdateEvent,
  EditorSchemeSaveEvent,
  EditorSchemeUpdateEvent,
} from './editor.types';

interface EditorContextProps {
  lightsScheme: LightsSchemeData;
  lightsLayout: LightsLayoutOption;
  setLightsLayout: Dispatch<SetStateAction<LightsLayoutOption>>;
  isColorDialogOpen: boolean;
  setIsColorDialogOpen: Dispatch<SetStateAction<boolean>>;
  colorIndex: number;
  setColorIndex: Dispatch<SetStateAction<number>>;
  frameIndex: number;
  setFrameIndex: Dispatch<SetStateAction<number>>;
  framesCount: number;
  nextFrame: () => void;
  nextFrameAvailable: boolean;
  previousFrame: () => void;
  previousFrameAvailable: boolean;
  handleUpdate: (scheme: LightsScheme) => void;
  handleUndo: () => void;
  undoAvailable: boolean;
  handleRedo: () => void;
  redoAvailable: boolean;
  handleSave: () => void;
}

const editorContextDefaultValues: EditorContextProps = {
  lightsScheme: {
    scheme: DEFAULT_LIGHTS_SCHEME,
    uid: generateUid(),
    updatedAt: new Date().toISOString(),
  },
  lightsLayout: DEFAULT_LIGHTS_LAYOUT_OPTION,
  setLightsLayout: () => {
    // void
  },
  isColorDialogOpen: false,
  setIsColorDialogOpen: () => {
    // void
  },
  colorIndex: 0,
  setColorIndex: () => {
    // void
  },
  frameIndex: 0,
  setFrameIndex: () => {
    // void
  },
  framesCount: 0,
  nextFrame: () => {
    // void
  },
  nextFrameAvailable: false,
  previousFrame: () => {
    // void
  },
  previousFrameAvailable: false,
  handleUpdate: () => {
    // void
  },
  handleUndo: () => {
    // void
  },
  undoAvailable: false,
  handleRedo: () => {
    // void
  },
  redoAvailable: false,
  handleSave: () => {
    // void
  },
};

export const EditorContext = createContext<EditorContextProps>(editorContextDefaultValues);

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({
  children,
  initialSchemeData = {
    scheme: DEFAULT_LIGHTS_SCHEME,
    uid: generateUid(),
    updatedAt: new Date().toISOString(),
  },
}: {
  children: ReactNode;
  initialSchemeData?: LightsSchemeData | undefined;
}) => {
  const [lightsLayout, setLightsLayout] = useState<LightsLayoutOption>(
    DEFAULT_LIGHTS_LAYOUT_OPTION,
  );
  const [lightsScheme, setLightsScheme] = useState<LightsSchemeData>(initialSchemeData);
  const [lightsSchemeHistory, setLightsSchemeHistory] = useState<LightsScheme[]>([]);
  const [lightsSchemeHistoryIndex, setLightsSchemeHistoryIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);

  const handleUpdate = useCallback(
    (newScheme: LightsScheme) => {
      const newSchemeHistory = [...lightsSchemeHistory];
      const newSchemeHistoryIndex = lightsSchemeHistoryIndex + 1;

      if (newSchemeHistoryIndex < EDITOR_MAX_HISTORY) {
        newSchemeHistory.splice(newSchemeHistoryIndex);
      } else {
        newSchemeHistory.shift();
      }

      newSchemeHistory.push(newScheme);
      setLightsSchemeHistory(newSchemeHistory);
      setLightsSchemeHistoryIndex(newSchemeHistory.length - 1);
      setLightsScheme({
        ...lightsScheme,
        scheme: newScheme,
        updatedAt: new Date().toISOString(),
      });
    },
    [lightsScheme, lightsSchemeHistory, lightsSchemeHistoryIndex],
  );

  const handleUndo = useCallback(() => {
    const previousScheme = lightsSchemeHistory[lightsSchemeHistoryIndex - 1];
    if (lightsSchemeHistoryIndex > 0 && previousScheme) {
      setLightsSchemeHistoryIndex(lightsSchemeHistoryIndex - 1);
      setLightsScheme({ ...lightsScheme, scheme: previousScheme });
    }
  }, [lightsSchemeHistory, lightsSchemeHistoryIndex, lightsScheme]);

  const handleRedo = useCallback(() => {
    const nextScheme = lightsSchemeHistory[lightsSchemeHistoryIndex + 1];
    if (lightsSchemeHistoryIndex < lightsSchemeHistory.length - 1 && nextScheme) {
      setLightsSchemeHistoryIndex(lightsSchemeHistoryIndex + 1);
      setLightsScheme({ ...lightsScheme, scheme: nextScheme });
    }
  }, [lightsSchemeHistory, lightsSchemeHistoryIndex, lightsScheme]);

  const handleSave = useCallback(() => {
    dispatchCustomEvent<EditorSchemeSaveEvent>({
      name: 'app:editor:scheme:save',
      detail: {
        uid: lightsScheme.uid,
        scheme: resolveLightsSchemeColorIndexes(lightsScheme.scheme, lightsLayout.value),
      },
    });
  }, [lightsScheme, lightsLayout.value]);

  const nextFrame = useCallback(
    () =>
      setFrameIndex((previousFrameIndex) =>
        previousFrameIndex + 1 < lightsScheme.scheme.frames.length
          ? previousFrameIndex + 1
          : previousFrameIndex,
      ),
    [lightsScheme.scheme.frames.length],
  );

  const previousFrame = useCallback(
    () =>
      setFrameIndex((previousFrameIndex) => (previousFrameIndex > 0 ? previousFrameIndex - 1 : 0)),
    [],
  );

  useEffect(() => {
    if (!isColorDialogOpen && lightsScheme.scheme.frames[frameIndex]) {
      dispatchCustomEvent<EditorSchemeUpdateEvent>({
        name: 'app:editor:scheme:update',
        detail: {
          scheme: resolveLightsSchemeColorIndexes(lightsScheme.scheme, lightsLayout.value),
          frameIndex,
        },
      });
    }
  }, [isColorDialogOpen, lightsScheme.scheme, frameIndex, lightsLayout.value]);

  useEffect(() => {
    if (isColorDialogOpen) {
      dispatchCustomEvent<EditorColorUpdateEvent>({
        name: 'app:editor:color:update',
        detail: { colorIndex },
      });
    }
  }, [isColorDialogOpen, colorIndex]);

  const value = useMemo(
    () => ({
      lightsScheme: lightsScheme,
      lightsLayout,
      setLightsLayout,
      isColorDialogOpen,
      setIsColorDialogOpen,
      colorIndex,
      setColorIndex,
      frameIndex,
      setFrameIndex,
      framesCount: lightsScheme.scheme.frames.length,
      nextFrame,
      nextFrameAvailable: frameIndex < lightsScheme.scheme.frames.length - 1,
      previousFrame,
      previousFrameAvailable: frameIndex > 0,
      handleUpdate,
      handleUndo,
      undoAvailable: lightsSchemeHistoryIndex > 0,
      handleRedo,
      redoAvailable: lightsSchemeHistoryIndex < lightsSchemeHistory.length - 1,
      handleSave,
    }),
    [
      lightsScheme,
      lightsLayout,
      isColorDialogOpen,
      colorIndex,
      frameIndex,
      lightsSchemeHistoryIndex,
      lightsSchemeHistory,
      handleUpdate,
      handleUndo,
      handleRedo,
      handleSave,
      nextFrame,
      previousFrame,
    ],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
};

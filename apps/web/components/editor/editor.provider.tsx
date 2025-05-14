import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { resolveLightsSchemeColorIndexes } from 'devices/devices.utils';
import {
  DEFAULT_LIGHTS_LAYOUT_OPTION,
  DEFAULT_LIGHTS_SCHEME,
  LIGHTS_BACKGROUND_COLOR,
  LIGHTS_PALLETTE_HUE_MASK,
  LIGHTS_PALLETTE_HUE_MAX,
  LIGHTS_PALLETTE_LIGHTNESS_MASK,
} from 'devices/lights.config';
import { dispatchCustomEvent } from 'utils/customEvent';
import { generateUid } from 'utils/uid';

import { createLightColor } from '../../../../packages/devices/src/lights/lights.utils';

import { EDITOR_INITIAL_RECENT_COLORS_INDEX_MODULO, EDITOR_MAX_HISTORY } from './editor.config';
import { resolveBinaryColorStyle } from './editor.utils';

import type {
  LightColor,
  LightsLayoutOption,
  LightsScheme,
  LightsSchemeData,
} from 'devices/lights.types';
import type {
  UpdateColorDeviceEvent,
  UpdateSchemeDeviceEvent,
} from '../../../../packages/devices/src/devices/devices.events';
import type { EditorColorPalette } from './editor.types';

interface EditorContextProps {
  lightsScheme: LightsSchemeData;
  lightsLayout: LightsLayoutOption;
  setLightsLayout: Dispatch<SetStateAction<LightsLayoutOption>>;
  isColorDialogOpen: boolean;
  handleColorDialogOpenChange: (open: boolean) => void;
  color: LightColor;
  selectColor: (index: LightColor) => void;
  colorPalette: EditorColorPalette[];
  recentColors: EditorColorPalette[];
  hueColors: EditorColorPalette[];
  lightnessColors: EditorColorPalette[];
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

const editorColorPalette: EditorColorPalette[] = Array.from(
  { length: LIGHTS_PALLETTE_HUE_MASK + LIGHTS_PALLETTE_LIGHTNESS_MASK + 1 },
  (_, index) => index,
).map((index) => ({
  index,
  color: resolveBinaryColorStyle(createLightColor(index)),
}));

const initialRecentColors: EditorColorPalette[] = editorColorPalette
  .filter((color) => color.index % EDITOR_INITIAL_RECENT_COLORS_INDEX_MODULO === 0)
  .slice(
    2 * EDITOR_INITIAL_RECENT_COLORS_INDEX_MODULO,
    3 * EDITOR_INITIAL_RECENT_COLORS_INDEX_MODULO,
  );

const resolveHueColorPalette = (color: LightColor): EditorColorPalette[] => {
  const palletPart = Math.floor(color / LIGHTS_PALLETTE_HUE_MAX);

  return editorColorPalette.slice(
    palletPart * LIGHTS_PALLETTE_HUE_MAX,
    (palletPart + 1) * LIGHTS_PALLETTE_HUE_MAX,
  );
};

const resolveLightnessColorPalette = (color: LightColor): EditorColorPalette[] => {
  const partIndex = color % LIGHTS_PALLETTE_HUE_MAX;

  return editorColorPalette.filter(
    (paletteColor) => paletteColor.index % LIGHTS_PALLETTE_HUE_MAX === partIndex,
  );
};

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
  handleColorDialogOpenChange: () => {
    // void
  },
  color: LIGHTS_BACKGROUND_COLOR,
  selectColor: () => {
    // void
  },
  colorPalette: editorColorPalette,
  recentColors: initialRecentColors,
  hueColors: [],
  lightnessColors: [],
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
  const [color, setColor] = useState<LightColor>(LIGHTS_BACKGROUND_COLOR);
  const [lastColorIndex, setLastColorIndex] = useState<number>(0);
  const [isColorDialogOpen, setIsColorDialogOpen] = useState(false);
  const [recentColors, setRecentColors] = useState<EditorColorPalette[]>(initialRecentColors);
  const [hueColors, setHueColors] = useState<EditorColorPalette[]>(
    resolveHueColorPalette(LIGHTS_BACKGROUND_COLOR),
  );
  const [lightnessColors, setLightnessColors] = useState<EditorColorPalette[]>(
    resolveLightnessColorPalette(LIGHTS_BACKGROUND_COLOR),
  );

  const selectColor = useCallback((index: LightColor) => {
    setColor(index);
  }, []);

  const handleColorDialogOpenChange = useCallback(
    (open: boolean) => {
      setIsColorDialogOpen(open);

      if (open) {
        setLastColorIndex(color);
        return;
      }

      if (lastColorIndex === color) {
        return;
      }

      setRecentColors((previousRecentColors) => {
        const newRecentColors = previousRecentColors.filter(
          (recentColor) => recentColor.index !== color,
        );
        const selectedColor = editorColorPalette.find(
          (paletteColor) => paletteColor.index === color,
        );

        if (!selectedColor) {
          return previousRecentColors;
        }

        newRecentColors.unshift(selectedColor);
        return newRecentColors.slice(0, initialRecentColors.length);
      });
    },
    [color, lastColorIndex],
  );

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
    dispatchCustomEvent({
      name: 'app:scheme:save',
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
      dispatchCustomEvent<UpdateSchemeDeviceEvent>({
        name: 'app:update:scheme',
        detail: {
          scheme: resolveLightsSchemeColorIndexes(lightsScheme.scheme, lightsLayout.value),
          frameIndex,
        },
      });
    }
  }, [isColorDialogOpen, lightsScheme.scheme, frameIndex, lightsLayout.value]);

  useEffect(() => {
    if (isColorDialogOpen) {
      dispatchCustomEvent<UpdateColorDeviceEvent>({
        name: 'app:update:color',
        detail: { color: color },
      });
    }
  }, [isColorDialogOpen, color]);

  useEffect(() => {
    setHueColors(resolveHueColorPalette(color));
    setLightnessColors(resolveLightnessColorPalette(color));
  }, [color]);

  const editorProviderValue = useMemo(
    () => ({
      lightsScheme: lightsScheme,
      lightsLayout,
      setLightsLayout,
      isColorDialogOpen,
      handleColorDialogOpenChange,
      color,
      selectColor,
      colorPalette: editorColorPalette,
      recentColors,
      hueColors,
      lightnessColors,
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
      handleColorDialogOpenChange,
      color,
      recentColors,
      hueColors,
      lightnessColors,
      selectColor,
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

  return <EditorContext.Provider value={editorProviderValue}>{children}</EditorContext.Provider>;
};

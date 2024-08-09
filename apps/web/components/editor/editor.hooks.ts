'use client';

import { useCallback, useEffect, useState } from 'react';

import { dispatchCustomEvent } from 'utils/customEvent';
import { DEFAULT_DEVICE } from 'devices/devices.config';

import { resolveLightsSchemeColorIndexes } from 'devices/devices.utils';

import { EDITOR_DEFAULT_TOOL } from './editor.config';

import type { Device } from 'devices/devices.types';
import type {
  EditorColorUpdateEvent,
  EditorSchemeSaveEvent,
  EditorSchemeUpdateEvent,
} from './editor.types';
import type { LightsScheme, LightsSchemeData } from 'devices/lights.types';

const MAX_HISTORY = 50;

export const useEditor = (
  schemeData: LightsSchemeData,
  onSave: (schemeData: LightsSchemeData) => void,
) => {
  const [device, setDevice] = useState<Device>(DEFAULT_DEVICE);
  const [updatedSchemeData, setUpdatedSchemeData] = useState<LightsSchemeData>(schemeData);
  const [schemeHistory, setSchemeHistory] = useState<LightsScheme[]>([]);
  const [schemeHistoryIndex, setSchemeHistoryIndex] = useState(0);
  const [frameIndex, setFrameIndex] = useState(0);
  const [tool, setTool] = useState(EDITOR_DEFAULT_TOOL);
  const [colorIndex, setColorIndex] = useState(0);
  const [colorDialogOpen, setColorDialogOpen] = useState(false);

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
      setUpdatedSchemeData({
        ...updatedSchemeData,
        scheme: newScheme,
        updatedAt: new Date().toISOString(),
      });
    },
    [updatedSchemeData, schemeHistory, schemeHistoryIndex],
  );

  const handleUndo = useCallback(() => {
    const previousScheme = schemeHistory[schemeHistoryIndex - 1];
    if (schemeHistoryIndex > 0 && previousScheme) {
      setSchemeHistoryIndex(schemeHistoryIndex - 1);
      setUpdatedSchemeData({ ...updatedSchemeData, scheme: previousScheme });
    }
  }, [schemeHistory, schemeHistoryIndex, updatedSchemeData]);

  const handleRedo = useCallback(() => {
    const nextScheme = schemeHistory[schemeHistoryIndex + 1];
    if (schemeHistoryIndex < schemeHistory.length - 1 && nextScheme) {
      setSchemeHistoryIndex(schemeHistoryIndex + 1);
      setUpdatedSchemeData({ ...updatedSchemeData, scheme: nextScheme });
    }
  }, [schemeHistory, schemeHistoryIndex, updatedSchemeData]);

  const handleSave = useCallback(() => {
    onSave(updatedSchemeData);

    dispatchCustomEvent<EditorSchemeSaveEvent>({
      name: 'app:editor:scheme:save',
      detail: {
        uid: updatedSchemeData.uid,
        scheme: resolveLightsSchemeColorIndexes(updatedSchemeData.scheme, device.size.value),
      },
    });
  }, [onSave, updatedSchemeData, device.size.value]);

  useEffect(() => {
    !colorDialogOpen &&
      updatedSchemeData.scheme.frames[frameIndex] &&
      dispatchCustomEvent<EditorSchemeUpdateEvent>({
        name: 'app:editor:scheme:update',
        detail: {
          scheme: resolveLightsSchemeColorIndexes(updatedSchemeData.scheme, device.size.value),
          frameIndex,
        },
      });
  }, [colorDialogOpen, updatedSchemeData.scheme, frameIndex, device.size.value]);

  useEffect(() => {
    colorDialogOpen &&
      updatedSchemeData.scheme.colors[colorIndex] &&
      dispatchCustomEvent<EditorColorUpdateEvent>({
        name: 'app:editor:color:update',
        detail: updatedSchemeData.scheme.colors[colorIndex],
      });
  }, [colorDialogOpen, colorIndex, updatedSchemeData.scheme.colors]);

  return {
    device,
    setDevice,
    updatedSchemeData,
    handleUpdate,
    handleUndo,
    handleRedo,
    handleSave,
    undoAvailable: schemeHistoryIndex > 0,
    redoAvailable: schemeHistoryIndex < schemeHistory.length - 1,
    frameIndex,
    setFrameIndex,
    tool,
    setTool,
    colorIndex,
    setColorIndex,
    colorDialogOpen,
    setColorDialogOpen,
  };
};

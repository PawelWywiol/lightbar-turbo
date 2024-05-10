'use client';

import { useCallback, useEffect, useState } from 'react';

import { dispatchCustomEvent } from 'utils/customEvent';
import { DEFAULT_DEVICE } from 'config/devices';

import { resolveLightsSchemeColorIndexes } from '../connectedDevices/connectedDevices.utils';

import { EDITOR_DEFAULT_TOOL } from './editor.config';

import type { Device } from 'config/devices.types';
import type { EditorColorUpdatedEvent, EditorSchemeUpdatedEvent } from './editor.types';
import type { LightsScheme, LightsSchemeData } from 'config/lights.types';

const MAX_HISTORY = 50;

export const useEditor = (schemeData: LightsSchemeData) => {
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

  useEffect(() => {
    !colorDialogOpen &&
      updatedSchemeData.scheme.frames[frameIndex] &&
      dispatchCustomEvent<EditorSchemeUpdatedEvent>({
        name: 'app:editor:scheme:updated',
        detail: {
          scheme: resolveLightsSchemeColorIndexes(updatedSchemeData.scheme, device.size.value),
          frameIndex,
        },
      });
  }, [colorDialogOpen, updatedSchemeData.scheme, frameIndex, device.size.value]);

  useEffect(() => {
    colorDialogOpen &&
      updatedSchemeData.scheme.colors[colorIndex] &&
      dispatchCustomEvent<EditorColorUpdatedEvent>({
        name: 'app:editor:color:updated',
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

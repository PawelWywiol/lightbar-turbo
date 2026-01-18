import type { LightsFrame } from 'devices/lights.types';
import { useCallback } from 'react';
import { useEditor } from './editor.provider';

export const useFrameUpdater = () => {
  const { lightsScheme, frameIndex, handleUpdate } = useEditor();

  return useCallback(
    (updater: (frame: LightsFrame) => void): boolean => {
      const updated = structuredClone(lightsScheme.scheme);
      const frame = updated.frames[frameIndex];
      if (!frame) return false;
      updater(frame);
      handleUpdate(updated);
      return true;
    },
    [lightsScheme.scheme, frameIndex, handleUpdate],
  );
};

import { useRef } from 'react';

import { DEFAULT_LIGHTS_FRAME_TEMPO, DEFAULT_LIGHTS_FRAME_TYPE } from 'devices/lights.config';

import { resolveBinaryColorStyle } from '../../editor.utils';
import { useEditor } from '../../editor.provider';

import { useGridPainter } from './lightsFrameGrid.hooks';

import type { LightsFrame } from 'devices/lights.types';

export const LightsFrameGrid = () => {
  const { lightsScheme, lightsLayout, frameIndex, colorIndex, handleUpdate } = useEditor();
  const ref = useRef<HTMLDivElement>(null);
  const currentFrame = lightsScheme.scheme.frames[frameIndex];

  useGridPainter(ref, resolveBinaryColorStyle(colorIndex), (updatedColorIndexes) => {
    const updatedFrame: LightsFrame = {
      ...currentFrame,
      type: currentFrame?.type ?? DEFAULT_LIGHTS_FRAME_TYPE,
      tempo: currentFrame?.tempo ?? DEFAULT_LIGHTS_FRAME_TEMPO,
      colorIndexes: Array.from({
        length: lightsLayout.value,
      }).map((_, index) => {
        return updatedColorIndexes.includes(index)
          ? colorIndex
          : (currentFrame?.colorIndexes[index] ?? 0);
      }),
    };

    handleUpdate({
      ...lightsScheme.scheme,
      frames: lightsScheme.scheme.frames.map((frame, index) =>
        index === frameIndex ? updatedFrame : frame,
      ),
    });
  });

  return (
    currentFrame && (
      <div
        ref={ref}
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${lightsLayout.grid.columns},minmax(0,1fr))` }}
      >
        {Array.from({ length: lightsLayout.value }).map((_, index) => {
          const color = resolveBinaryColorStyle(currentFrame.colorIndexes[index] ?? 0);
          return (
            <div
              key={`color-${color}-${index}`}
              className="w-full h-full rounded aspect-square"
              style={{ background: `${color}` }}
            />
          );
        })}
      </div>
    )
  );
};

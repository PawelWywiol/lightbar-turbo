import { useRef } from 'react';

import {
  DEFAULT_LIGHTS_FRAME_TEMPO,
  DEFAULT_LIGHTS_FRAME_TYPE,
  LIGHTS_BACKGROUND_COLOR,
} from 'devices/lights.config';

import { useEditor } from '../../editor.provider';
import { resolveBinaryColorStyle } from '../../editor.utils';

import { useGridPainter } from './lightsFrameGrid.hooks';

import type { LightsFrame } from 'devices/lights.types';

export const LightsFrameGrid = () => {
  const { lightsScheme, lightsLayout, frameIndex, color, handleUpdate } = useEditor();
  const ref = useRef<HTMLDivElement>(null);
  const currentFrame = lightsScheme.scheme.frames[frameIndex];

  useGridPainter(ref, resolveBinaryColorStyle(color), (updatedColorIndexes) => {
    const updatedFrame: LightsFrame = {
      ...currentFrame,
      type: currentFrame?.type ?? DEFAULT_LIGHTS_FRAME_TYPE,
      tempo: currentFrame?.tempo ?? DEFAULT_LIGHTS_FRAME_TEMPO,
      colors: Array.from({
        length: lightsLayout.value,
      }).map((_, index) => {
        return updatedColorIndexes.includes(index)
          ? color
          : (currentFrame?.colors[index] ?? LIGHTS_BACKGROUND_COLOR);
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
        style={{
          gridTemplateColumns: `repeat(${lightsLayout.grid.columns},minmax(0,1fr))`,
        }}
      >
        {Array.from({ length: lightsLayout.value }).map((_, index) => {
          const binaryColorStyle = resolveBinaryColorStyle(
            currentFrame.colors[index] ?? LIGHTS_BACKGROUND_COLOR,
          );
          const key = `color-${binaryColorStyle}-${index}`;
          return (
            <div
              key={key}
              className="w-full h-full rounded aspect-square"
              style={{ background: `${binaryColorStyle}` }}
            />
          );
        })}
      </div>
    )
  );
};

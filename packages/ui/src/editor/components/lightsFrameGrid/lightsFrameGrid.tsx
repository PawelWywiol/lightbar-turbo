import { useRef } from 'react';

import { DEFAULT_LIGHTS_FRAME_TEMPO, DEFAULT_LIGHTS_FRAME_TYPE } from 'config/lights';

import { useGridPainter } from './lightsFrameGrid.utils';

import type { LightsFrame } from 'config/lights.types';
import type { LightsFrameGridProps } from './lightsFrameGrid.types';

export const LightsFrameGrid = ({
  scheme,
  handleUpdate,
  frameIndex,
  colorIndex,
  device,
}: LightsFrameGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const currentFrame = scheme.frames[frameIndex];

  useGridPainter(ref, scheme.colors[colorIndex] ?? 'transparent', (updatedColorIndexes) => {
    const updatedFrame: LightsFrame = {
      ...currentFrame,
      type: currentFrame?.type ?? DEFAULT_LIGHTS_FRAME_TYPE,
      tempo: currentFrame?.tempo ?? DEFAULT_LIGHTS_FRAME_TEMPO,
      colorIndexes: Array.from({
        length: device.size.value,
      }).map((_, index) => {
        return updatedColorIndexes.includes(index)
          ? colorIndex
          : currentFrame?.colorIndexes[index] ?? 0;
      }),
    };

    handleUpdate({
      ...scheme,
      frames: scheme.frames.map((frame, index) => (index === frameIndex ? updatedFrame : frame)),
    });
  });

  return (
    currentFrame && (
      <div
        ref={ref}
        className={`px-4 grid gap-1`}
        style={{ gridTemplateColumns: `repeat(${device.size.grid.columns},minmax(0,1fr))` }}
      >
        {Array.from({ length: device.size.value }).map((_, index) => {
          const color = scheme.colors[currentFrame.colorIndexes[index] ?? 0] ?? 'transparent';
          return (
            <div
              key={index}
              className="w-full h-full rounded aspect-square"
              style={{ background: `${color}` }}
            />
          );
        })}
      </div>
    )
  );
};

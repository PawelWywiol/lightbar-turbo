import { useRef } from 'react';

import { useGridPainter } from './lightsFrameGrid.utils';

import type { LightsFrameGridProps } from './lightsFrameGrid.types';

export const LightsFrameGrid = ({
  scheme,
  setScheme,
  frameIndex,
  colorIndex,
}: LightsFrameGridProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = scheme.frames[frameIndex];

  if (frame === undefined) {
    return null;
  }

  useGridPainter(
    ref,
    scheme.colors[colorIndex] ?? 'transparent',
    (updatedColorIndex, updatedColorIndexes) => {},
    (updatedColorIndexes) => {
      const updatedFrame = {
        ...frame,
        colorIndexes: Array.from({
          length: scheme.size.value,
        }).map((_, index) => {
          return updatedColorIndexes.includes(index) ? colorIndex : frame.colorIndexes[index] ?? 0;
        }),
      };

      setScheme({
        ...scheme,
        frames: scheme.frames.map((frame, index) => (index === frameIndex ? updatedFrame : frame)),
      });
    },
  );

  return (
    <div
      ref={ref}
      className={`px-4 grid gap-1`}
      style={{ gridTemplateColumns: `repeat(${scheme.size.grid.columns},minmax(0,1fr))` }}
    >
      {Array.from({ length: scheme.size.value }).map((_, index) => {
        const color = scheme.colors[frame.colorIndexes[index] ?? 0] ?? 'transparent';
        return (
          <div
            key={index}
            className="w-full h-full rounded aspect-square"
            style={{ background: `${color}` }}
          />
        );
      })}
    </div>
  );
};

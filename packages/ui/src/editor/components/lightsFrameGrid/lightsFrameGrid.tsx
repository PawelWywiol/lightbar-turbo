import { useEffect, useRef } from 'react';

import type { EditorFrameProps } from '../../editor.types';
import { DEFAULT_PAINTER_STATE, GridPainterState, useGridPainter } from './lightsFrameGrid.utils';

export const LightsFrameGrid = ({ scheme, frameIndex }: EditorFrameProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const frame = scheme.frames[frameIndex];
  const painterState = useRef<GridPainterState>(DEFAULT_PAINTER_STATE);

  useGridPainter(
    ref,
    painterState,
    (currentState) => {
      console.log('update', currentState.itemIndex);
    },
    () => {
      console.log('end');
    },
  );

  return (
    frame !== undefined && (
      <div
        ref={ref}
        className={`px-4 grid gap-1`}
        style={{ gridTemplateColumns: `repeat(${scheme.size.grid.columns},minmax(0,1fr))` }}
      >
        {Array.from({ length: scheme.size.value }).map((_, index) => {
          const colorIndex = frame.colorIndexes[index] ?? 0;
          const color = scheme.colors[colorIndex] ?? 'transparent';
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

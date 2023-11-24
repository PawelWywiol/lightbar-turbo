import { LightsScheme } from 'config';

import type { ShiftDirection } from './editor.types';

const transpose = (matrix: number[][]) =>
  (matrix[0] ?? []).map((_, i) => matrix.map((row) => row[i] ?? 0));

export const shiftLightsFrameColorPixel = (
  scheme: LightsScheme,
  frameIndex: number,
  direction: ShiftDirection,
): LightsScheme => {
  const frame = Array.from(
    { length: scheme.size.value },
    (_, i) => scheme.frames[frameIndex]?.colorIndexes[i] ?? 0,
  );
  const newFrame: number[] = [];
  const rowsCount = scheme.size.grid.rows;
  const columnsCount = scheme.size.grid.columns;

  const frameRows = Array.from({ length: rowsCount }, (_, i) =>
    frame.slice(i * columnsCount, (i + 1) * columnsCount),
  );
  const frameColumns = Array.from({ length: columnsCount }, (_, i) =>
    frame.filter((_, j) => j % columnsCount === i),
  );

  switch (direction) {
    case 'up':
      frameRows.push(frameRows.shift()!);
      newFrame.push(...frameRows.flat());
      break;
    case 'down':
      frameRows.unshift(frameRows.pop()!);
      newFrame.push(...frameRows.flat());
      break;
    case 'left':
      frameColumns.push(frameColumns.shift()!);
      newFrame.push(...transpose(frameColumns).flat());
      break;
    case 'right':
      frameColumns.unshift(frameColumns.pop()!);
      newFrame.push(...transpose(frameColumns).flat());
      break;
    case 'prev':
      frame.push(frame.shift()!);
      newFrame.push(...frame);
      break;
    case 'next':
      frame.unshift(frame.pop()!);
      newFrame.push(...frame);
      break;
    case 'shuffle':
      frame.sort(() => Math.random() - 0.5);
      newFrame.push(...frame);
      break;
    default:
      newFrame.push(...frame);
      break;
  }

  return {
    ...scheme,
    frames: scheme.frames.map((f, i) => (i === frameIndex ? { ...f, colorIndexes: newFrame } : f)),
  };
};

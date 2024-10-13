import type { LightsLayoutOption, LightsScheme } from 'devices/lights.types';
import type { ShiftDirection } from './editor.types';

const transpose = (matrix: number[][]) =>
  (matrix[0] ?? []).map((_, index) => matrix.map((row) => row[index] ?? 0));

export const shiftLightsFrameColorPixel = (
  scheme: LightsScheme,
  frameIndex: number,
  direction: ShiftDirection,
  lightsLayout: LightsLayoutOption,
): LightsScheme => {
  const frame = Array.from(
    { length: lightsLayout.value },
    (_, index) => scheme.frames[frameIndex]?.colorIndexes[index] ?? 0,
  );
  const newFrame: number[] = [];
  const rowsCount = lightsLayout.grid.rows;
  const columnsCount = lightsLayout.grid.columns;

  const frameRows = Array.from({ length: rowsCount }, (_, index) =>
    frame.slice(index * columnsCount, (index + 1) * columnsCount),
  );
  const frameColumns = Array.from({ length: columnsCount }, (_iterationElement, iterationIndex) =>
    frame.filter(
      (_filteredElement, filteredIndex) => filteredIndex % columnsCount === iterationIndex,
    ),
  );

  switch (direction) {
    case 'up': {
      frameRows.push(frameRows.shift()!);
      newFrame.push(...frameRows.flat());
      break;
    }
    case 'down': {
      frameRows.unshift(frameRows.pop()!);
      newFrame.push(...frameRows.flat());
      break;
    }
    case 'left': {
      frameColumns.push(frameColumns.shift()!);
      newFrame.push(...transpose(frameColumns).flat());
      break;
    }
    case 'right': {
      frameColumns.unshift(frameColumns.pop()!);
      newFrame.push(...transpose(frameColumns).flat());
      break;
    }
    case 'prev': {
      frame.push(frame.shift()!);
      newFrame.push(...frame);
      break;
    }
    case 'next': {
      frame.unshift(frame.pop()!);
      newFrame.push(...frame);
      break;
    }
    case 'shuffle': {
      frame.sort(() => Math.random() - 0.5);
      newFrame.push(...frame);
      break;
    }
    default: {
      newFrame.push(...frame);
      break;
    }
  }

  return {
    ...scheme,
    frames: scheme.frames.map((f, index) =>
      index === frameIndex ? { ...f, colorIndexes: newFrame } : f,
    ),
  };
};

export const resolveBinaryColorStyle = (colorIndex: number): string => {
  const hue = colorIndex & 0b0011_1111;
  const saturation = colorIndex & (0b1100_0000 >> 6);

  return `hsl(${hue * 4}deg ${(saturation + 2) * 20}% 50%)`;
};

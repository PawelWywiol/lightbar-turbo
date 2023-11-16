import type { EditorFrameProps } from '../../editor.types';

export const LightsFrameGrid = ({ scheme, frameIndex }: EditorFrameProps) => {
  const frame = scheme.frames[frameIndex];

  if (!frame) {
    return null;
  }

  return (
    <div
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
  );
};

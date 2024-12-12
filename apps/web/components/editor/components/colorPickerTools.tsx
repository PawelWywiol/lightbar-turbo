import { Button } from 'ui/button';
import { DialogWrapper } from 'ui/dialog';
import { MESSAGES } from 'config/messages';
import { cn } from 'ui/cn';

import { resolveBinaryColorStyle } from '../editor.utils';
import { useEditor } from '../editor.provider';

import type { EditorColorPalette } from '../editor.types';

const ColorPickerGrid = ({
  className,
  colorPalette,
  selectColor,
  colorIndex,
}: {
  className?: string;
  colorPalette: EditorColorPalette[];
  selectColor: (index: number) => void;
  colorIndex: number;
}) => (
  <div
    className={cn('grid grid-cols-8 gap-1 desktop:gap-1 items-center justify-center', className)}
  >
    {colorPalette.map(({ index, color }) => (
      <button
        key={`color-${index}-${color}`}
        className="w-full h-10 rounded cursor-pointer flex justify-center items-center outline-none"
        onClick={() => selectColor(index)}
        style={{ background: color }}
      >
        {index === colorIndex && (
          <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
        )}
      </button>
    ))}
  </div>
);

export const ColorPickerTools = () => {
  const {
    handleColorDialogOpenChange,
    colorIndex,
    selectColor,
    recentColors,
    hueColors,
    lightnessColors,
  } = useEditor();

  return (
    <DialogWrapper
      onOpenChange={handleColorDialogOpenChange}
      trigger={
        <Button className="rounded aspect-square px-0 overflow-hidden" asChild>
          <span
            className="rounded w-5 aspect-square"
            style={{ backgroundColor: resolveBinaryColorStyle(colorIndex) }}
          />
        </Button>
      }
      title={MESSAGES.editor.choseColor}
    >
      <ColorPickerGrid colorPalette={hueColors} selectColor={selectColor} colorIndex={colorIndex} />
      <ColorPickerGrid
        className="pt-2 mt-2 border-t grid-cols-4"
        colorPalette={lightnessColors}
        selectColor={selectColor}
        colorIndex={colorIndex}
      />
      <ColorPickerGrid
        className="pt-2 mt-2 border-t"
        colorPalette={recentColors}
        selectColor={selectColor}
        colorIndex={colorIndex}
      />
    </DialogWrapper>
  );
};

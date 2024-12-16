import { Button } from 'ui/button';
import { DialogWrapper } from 'ui/dialog';
import { MESSAGES } from 'config/messages';
import { cn } from 'ui/cn';

import { resolveBinaryColorStyle } from '../editor.utils';
import { useEditor } from '../editor.provider';
import { createLightColor } from '../../../../../packages/devices/src/lights/lights.utils';

import type { LightColor } from 'devices/lights.types';
import type { EditorColorPalette } from '../editor.types';

const ColorPickerGrid = ({
  className,
  colorPalette,
  selectColor,
  activeColor,
}: {
  className?: string;
  colorPalette: EditorColorPalette[];
  selectColor: (index: LightColor) => void;
  activeColor: LightColor;
}) => (
  <div
    className={cn('grid grid-cols-8 gap-1 desktop:gap-1 items-center justify-center', className)}
  >
    {colorPalette.map(({ index, color }) => (
      <button
        key={`color-${index}-${color}`}
        className="w-full h-10 rounded cursor-pointer flex justify-center items-center outline-none"
        onClick={() => selectColor(createLightColor(index))}
        style={{ background: color }}
      >
        {index === activeColor && (
          <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
        )}
      </button>
    ))}
  </div>
);

export const ColorPickerTools = () => {
  const {
    handleColorDialogOpenChange,
    color,
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
            style={{ backgroundColor: resolveBinaryColorStyle(color) }}
          />
        </Button>
      }
      title={MESSAGES.editor.choseColor}
    >
      <ColorPickerGrid colorPalette={hueColors} selectColor={selectColor} activeColor={color} />
      <ColorPickerGrid
        className="pt-2 mt-2 border-t grid-cols-4"
        colorPalette={lightnessColors}
        selectColor={selectColor}
        activeColor={color}
      />
      <ColorPickerGrid
        className="pt-2 mt-2 border-t"
        colorPalette={recentColors}
        selectColor={selectColor}
        activeColor={color}
      />
    </DialogWrapper>
  );
};

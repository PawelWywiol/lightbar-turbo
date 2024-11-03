import { Button } from 'ui/button';
import { DialogWrapper } from 'ui/dialog';
import { LIGHTS_MAX_COLORS_COUNT } from 'devices/lights.config';
import { MESSAGES } from 'config/messages';

import { resolveBinaryColorStyle } from '../editor.utils';
import { useEditor } from '../editor.provider';

export const ColorPickerTools = () => {
  const { setIsColorDialogOpen, colorIndex, setColorIndex } = useEditor();

  return (
    <DialogWrapper
      onOpenChange={setIsColorDialogOpen}
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
      <div className="grid grid-cols-8 gap-1 desktop:gap-1 items-center justify-center">
        {Array.from({ length: LIGHTS_MAX_COLORS_COUNT }, (_, index) => index).map((color) => (
          <button
            key={color}
            className="w-full aspect-square rounded cursor-pointer flex justify-center items-center outline-none"
            onClick={() => {
              setColorIndex(color);
              setIsColorDialogOpen(false);
            }}
            style={{ background: resolveBinaryColorStyle(color) }}
          >
            {color === colorIndex && (
              <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
            )}
          </button>
        ))}
      </div>
    </DialogWrapper>
  );
};

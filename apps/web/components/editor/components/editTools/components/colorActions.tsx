import { Button } from 'ui/button';
import { Dialog, DialogContent, DialogTrigger } from 'ui/dialog';

import { resolveBinaryColorStyle } from '../../../editor.utils';

import type { EditToolsProps } from '../editTools.types';

export const ColorActions = ({
  colorIndex,
  setColorIndex,
  setColorDialogOpen,
}: Pick<EditToolsProps, 'colorIndex' | 'setColorIndex' | 'setColorDialogOpen'>) => (
  <Dialog onOpenChange={setColorDialogOpen}>
    <DialogTrigger>
      <Button className="rounded aspect-square px-0 overflow-hidden">
        <span
          className="rounded w-5 aspect-square"
          style={{ backgroundColor: resolveBinaryColorStyle(colorIndex) }}
        />
      </Button>
    </DialogTrigger>
    <DialogContent className="grid grid-cols-8 gap-1 items-center justify-center">
      {Array.from({ length: 64 }, (_, index) => index).map((color) => (
        <button
          key={color}
          className="w-8 aspect-square rounded cursor-pointer flex justify-center items-center outline-none"
          onClick={() => setColorIndex(color)}
          style={{ background: resolveBinaryColorStyle(color) }}
        >
          {color === colorIndex && (
            <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
          )}
        </button>
      ))}
    </DialogContent>
  </Dialog>
);

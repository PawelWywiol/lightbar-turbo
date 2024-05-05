import { DEFAULT_COLOR } from 'config/lights';
import { Button } from 'ui/button';
import { Dialog } from 'ui/dialog';

import type { EditToolsProps } from '../editTools.types';

export const ColorActions = ({
  colors,
  colorIndex,
  setColorIndex,
  setColorDialogOpen,
}: Pick<EditToolsProps, 'colors' | 'colorIndex' | 'setColorIndex' | 'setColorDialogOpen'>) => (
  <Dialog
    className="flex justify-center align-middle max-w-[fit-content]"
    trigger={
      <Button className="rounded aspect-square px-0 overflow-hidden">
        <span
          className="rounded w-5 aspect-square"
          style={{ backgroundColor: colors[colorIndex] ?? DEFAULT_COLOR }}
        />
      </Button>
    }
    onOpenChange={setColorDialogOpen}
  >
    <div className="grid grid-cols-8 gap-1">
      {colors.map((color, index) => (
        <button
          key={index}
          className="w-8 aspect-square rounded cursor-pointer flex justify-center items-center outline-none"
          onClick={() => setColorIndex(index)}
          style={{ background: color }}
        >
          {index === colorIndex && (
            <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
          )}
        </button>
      ))}
    </div>
  </Dialog>
);

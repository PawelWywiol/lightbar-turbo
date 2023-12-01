import { DEFAULT_COLOR } from 'config';

import { Button } from '../../../../button/button';
import { Dialog } from '../../../../dialog/dialog';

import type { EditToolsProps } from '../editTools.types';

export const ColorActions = ({
  colors,
  colorIndex,
  setColorIndex,
}: Pick<EditToolsProps, 'colors' | 'colorIndex' | 'setColorIndex'>) => (
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
  >
    <div className="grid grid-cols-8 gap-1">
      {colors.map((color, index) => (
        <span
          key={index}
          className="w-8 aspect-square rounded cursor-pointer flex justify-center items-center"
          onClick={() => setColorIndex(index)}
          style={{ background: color }}
        >
          {index === colorIndex && (
            <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
          )}
        </span>
      ))}
    </div>
  </Dialog>
);

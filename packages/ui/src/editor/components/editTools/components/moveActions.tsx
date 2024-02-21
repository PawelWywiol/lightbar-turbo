import { Button } from '../../../../button/button';
import {
  DoubleArrowDownIcon,
  DoubleArrowLeft,
  DoubleArrowRight,
  DoubleArrowUpIcon,
  PinLeftIcon,
  PinRightIcon,
  ShuffleIcon,
} from '../../../../icons/icons';

import type { ShiftDirection } from '../../../editor.types';

export const MoveActions = ({
  shiftLightsFrameColorPixel,
}: {
  shiftLightsFrameColorPixel: (direction: ShiftDirection) => void;
}) => (
  <div className="flex gap-1">
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('prev')}
    >
      <PinLeftIcon />
    </Button>
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('left')}
    >
      <DoubleArrowLeft />
    </Button>
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('up')}
    >
      <DoubleArrowUpIcon />
    </Button>
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('down')}
    >
      <DoubleArrowDownIcon />
    </Button>
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('right')}
    >
      <DoubleArrowRight />
    </Button>
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('next')}
    >
      <PinRightIcon />
    </Button>
    <Button
      className="px-2 aspect-square justify-center align-middle rounded"
      onClick={() => shiftLightsFrameColorPixel('shuffle')}
    >
      <ShuffleIcon />
    </Button>
  </div>
);

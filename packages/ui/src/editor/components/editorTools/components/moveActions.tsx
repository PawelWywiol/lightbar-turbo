import { Button } from '../../../../button/button';
import {
  DoubleArrowDownIcon,
  DoubleArrowLeft,
  DoubleArrowRight,
  DoubleArrowUpIcon,
  PinLeftIcon,
  PinRightIcon,
} from '../../../../icons';

export const MoveActions = () => (
  <>
    <Button className="px-2 aspect-square justify-center align-middle rounded">
      <PinLeftIcon />
    </Button>
    <Button className="px-2 aspect-square justify-center align-middle rounded">
      <DoubleArrowLeft />
    </Button>
    <Button className="px-2 aspect-square justify-center align-middle rounded">
      <DoubleArrowUpIcon />
    </Button>
    <Button className="px-2 aspect-square justify-center align-middle rounded">
      <DoubleArrowDownIcon />
    </Button>
    <Button className="px-2 aspect-square justify-center align-middle rounded">
      <DoubleArrowRight />
    </Button>
    <Button className="px-2 aspect-square justify-center align-middle rounded">
      <PinRightIcon />
    </Button>
  </>
);

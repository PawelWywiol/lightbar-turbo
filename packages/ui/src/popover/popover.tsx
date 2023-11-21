import { Popover as RadixPopover } from '@radix-ui/themes';

import { DotsVerticalIcon } from '../icons';
import { Button } from '../button/button';

import type { PopoverProps } from './popover.types';

export const Popover = ({ className, trigger, children }: PopoverProps) => (
  <RadixPopover.Root>
    <RadixPopover.Trigger>
      {trigger ?? (
        <Button className="px-2">
          <DotsVerticalIcon />
        </Button>
      )}
    </RadixPopover.Trigger>
    <RadixPopover.Content className={className}>{children}</RadixPopover.Content>
  </RadixPopover.Root>
);

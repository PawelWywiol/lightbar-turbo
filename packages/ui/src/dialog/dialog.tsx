import { Dialog as RadixDialog } from '@radix-ui/themes';

import { DotsVerticalIcon } from '../icons/icons';
import { Button } from '../button/button';

import type { DialogProps } from './dialog.types';

export const Dialog = ({ className, trigger, children }: DialogProps) => (
  <RadixDialog.Root>
    <RadixDialog.Trigger>
      {trigger ?? (
        <Button className="px-2">
          <DotsVerticalIcon />
        </Button>
      )}
    </RadixDialog.Trigger>

    <RadixDialog.Content className={className}>{children}</RadixDialog.Content>
  </RadixDialog.Root>
);

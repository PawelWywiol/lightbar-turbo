import { DropdownMenu as RadixDropdownMenu } from '@radix-ui/themes';

import { DotsVerticalIcon } from '../icons/icons';
import { Button } from '../button/button';

import type { DropDownMenuProps } from './dropdownMenu.types';

export const DropDownMenu = ({ trigger, options }: DropDownMenuProps) => (
  <RadixDropdownMenu.Root>
    <RadixDropdownMenu.Trigger>
      {trigger ?? (
        <Button className="px-2">
          <DotsVerticalIcon />
        </Button>
      )}
    </RadixDropdownMenu.Trigger>
    <RadixDropdownMenu.Content>
      {options.map((option, optionIndex) => (
        <RadixDropdownMenu.Item key={`${optionIndex}${option.label}`} onClick={option.onClick}>
          {option.label}
        </RadixDropdownMenu.Item>
      ))}
    </RadixDropdownMenu.Content>
  </RadixDropdownMenu.Root>
);

import { DropdownMenu as RadixDropdownMenu } from '@radix-ui/themes';

import { DotsVerticalIcon } from '../icons';

import type { DropDownMenuProps } from './dropdownMenu.types';

export const DropDownMenu = ({ trigger, options }: DropDownMenuProps) => (
  <RadixDropdownMenu.Root>
    <RadixDropdownMenu.Trigger>
      {trigger ?? (
        <button className="px-2">
          <DotsVerticalIcon />
        </button>
      )}
    </RadixDropdownMenu.Trigger>
    <RadixDropdownMenu.Content>
      {options.map((option, optionIndex) => {
        return (
          <RadixDropdownMenu.Item key={`${optionIndex}${option.label}`}>
            {option.label}
          </RadixDropdownMenu.Item>
        );
      })}
    </RadixDropdownMenu.Content>
  </RadixDropdownMenu.Root>
);

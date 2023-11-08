'use client';

import { Select as RadixSelect } from '@radix-ui/themes';

import type { SelectProps } from './select.types';

export const Select = ({ options, placeholder, value, onChange }: SelectProps) => (
  <RadixSelect.Root value={value ?? ''} onValueChange={onChange}>
    <RadixSelect.Trigger placeholder={placeholder} />
    <RadixSelect.Content>
      <RadixSelect.Group>
        {options.map((option) => {
          const optionValue: string = typeof option === 'object' ? option.value : `${option}`;
          const optionLabel: string = typeof option === 'object' ? option.label : `${option}`;

          return (
            <RadixSelect.Item key={`${optionValue}${optionLabel}`} value={optionValue}>
              {optionLabel}
            </RadixSelect.Item>
          );
        })}
      </RadixSelect.Group>
    </RadixSelect.Content>
  </RadixSelect.Root>
);

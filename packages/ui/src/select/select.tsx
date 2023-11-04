'use client';

import { Select as RadixSelect } from '@radix-ui/themes';

import type { SelectProps } from './select.types';

export const Select = ({ options, defaultValue, placeholder }: SelectProps) => (
  <RadixSelect.Root defaultValue={defaultValue ?? ''}>
    <RadixSelect.Trigger placeholder={placeholder} />
    <RadixSelect.Content>
      <RadixSelect.Group>
        {options.map((option) => {
          const value: string = typeof option === 'object' ? option.value : `${option}`;
          const label: string = typeof option === 'object' ? option.label : `${option}`;

          return (
            <RadixSelect.Item key={`${value}${label}`} value={value}>
              {label}
            </RadixSelect.Item>
          );
        })}
      </RadixSelect.Group>
    </RadixSelect.Content>
  </RadixSelect.Root>
);

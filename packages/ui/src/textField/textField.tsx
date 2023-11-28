'use client';

import { useEffect, useState } from 'react';
import { TextField as RadixTextField } from '@radix-ui/themes';
import type { TextFieldProps } from './textField.types';

export const TextField = ({
  className,
  value,
  placeholder,
  onChange,
  maxLength,
  removeHtml,
}: TextFieldProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const handleChange = () => {
    if (value !== internalValue) {
      onChange(internalValue);
    }
  };

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  return (
    <RadixTextField.Root className={className}>
      <RadixTextField.Input
        value={internalValue}
        placeholder={placeholder}
        onChange={(e) => {
          let newValue = e.currentTarget.value;
          if (maxLength && newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
          }
          if (removeHtml) {
            newValue = newValue.replace(/(<([^>]+)>)/gi, '');
          }
          setInternalValue(newValue);
        }}
        onBlur={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleChange();
          }
        }}
      />
    </RadixTextField.Root>
  );
};

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
    <RadixTextField.Root
      className={className}
      value={internalValue}
      placeholder={placeholder}
      onChange={(event) => {
        let newValue = event.currentTarget.value;

        if (maxLength && newValue.length > maxLength) {
          newValue = newValue.slice(0, maxLength);
        }

        setInternalValue(newValue);
      }}
      onBlur={handleChange}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          handleChange();
        }
      }}
    />
  );
};

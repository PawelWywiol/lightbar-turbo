import { forwardRef } from 'react';

import { cx } from 'cva';
import { Button as RadixButton } from '@radix-ui/themes';

import type { ButtonProps } from './button.types';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, onClick, active, disabled, ...props }, ref) => {
    return (
      <RadixButton
        {...props}
        ref={ref}
        className={cx(className, 'cursor-pointer px-2')}
        color={active ? undefined : 'gray'}
        disabled={disabled}
        onClick={onClick}
        variant={active ? 'surface' : 'outline'}
      >
        {children}
      </RadixButton>
    );
  },
);

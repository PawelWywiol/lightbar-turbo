import { Button as RadixButton } from '@radix-ui/themes';

import type { ButtonProps } from './button.types';

export const Button = ({ className, children, onClick, active, disabled }: ButtonProps) => (
  <RadixButton
    className={className}
    color={active ? undefined : 'gray'}
    disabled={disabled}
    onClick={onClick}
    variant={active ? 'surface' : 'outline'}
  >
    {children}
  </RadixButton>
);

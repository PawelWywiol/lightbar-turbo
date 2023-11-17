import { Button as RadixButton } from '@radix-ui/themes';

import type { ButtonProps } from './button.types';
import { cx } from 'cva';

export const Button = ({ className, children, onClick, active, disabled }: ButtonProps) => (
  <RadixButton
    className={cx(className, 'cursor-pointer px-2')}
    color={active ? undefined : 'gray'}
    disabled={disabled}
    onClick={onClick}
    variant={active ? 'surface' : 'outline'}
  >
    {children}
  </RadixButton>
);

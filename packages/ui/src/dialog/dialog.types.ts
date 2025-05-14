import type { ReactNode } from 'react';

export interface DialogProps {
  className?: string;
  trigger?: ReactNode;
  children: ReactNode;
  onOpenChange?: ((open: boolean) => void) | undefined;
}

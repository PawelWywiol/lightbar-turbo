import type { ReactNode } from 'react';

export interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  active?: boolean | undefined;
  disabled?: boolean | undefined;
}

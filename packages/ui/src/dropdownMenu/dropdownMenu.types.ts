import type { ReactNode } from 'react';

export interface DropDownMenuOption {
  label: ReactNode;
  onClick?: () => void;
}

export interface DropDownMenuProps {
  trigger?: ReactNode;
  options: DropDownMenuOption[];
}

import type { ReactNode } from 'react';

export interface PaginationItemProps {
  children: ReactNode;
  page: number;
  hrefTemplate?: string | undefined;
  disabled?: boolean | undefined;
  selected?: boolean | undefined;
  handleChange?: ((page: number) => void) | undefined;
}

export interface PaginationEdgeItemProps extends Omit<PaginationItemProps, 'children'> {
  type: 'prev' | 'next';
}

export interface PaginationNumberItemProps extends Omit<PaginationItemProps, 'children'> {
  range: [number, number];
}

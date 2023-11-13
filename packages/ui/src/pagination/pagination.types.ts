import type { ReactNode } from 'react';

export interface PaginationProps {
  className?: string;
  children?: ReactNode;
  page?: number | undefined;
  count: number;
  searchParamName?: string | null;
  siblingCount?: number;
  boundaryCount?: number;
  handleChange?: (page: number) => void;
}

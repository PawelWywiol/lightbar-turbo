import Link from 'next/link';
import { cx } from 'cva';

import { Button } from '../../button/button';

import type {
  PaginationItemProps,
  PaginationEdgeItemProps,
  PaginationNumberItemProps,
} from './paginationItem.type';

export const PaginationItem = ({
  children,
  page,
  // selected,
  disabled,
  handleChange,
  hrefTemplate,
}: PaginationItemProps) => {
  const className = cx('flex items-center justify-center w-full p-0 cursor-pointer');

  return (
    <li className="flex-1 flex justify-center align-middle">
      {hrefTemplate && !disabled ? (
        <Link
          className={className}
          href={hrefTemplate.replace('%7Bpage%7D', page.toString())}
          onClick={() => {
            handleChange && handleChange(page);
          }}
        >
          {children}
        </Link>
      ) : (
        <Button
          className={className}
          // active={selected}
          disabled={disabled}
          onClick={() => {
            handleChange && handleChange(page);
          }}
        >
          {children}
        </Button>
      )}
    </li>
  );
};

export const PaginationEdgeItem = ({
  page,
  type,
  disabled,
  handleChange,
  hrefTemplate,
}: PaginationEdgeItemProps) => (
  <PaginationItem
    page={page}
    disabled={disabled}
    handleChange={handleChange}
    hrefTemplate={hrefTemplate}
  >
    <span>{type === 'prev' ? '<' : '>'}</span>
  </PaginationItem>
);

export const PaginationSeparatorItem = () => (
  <PaginationItem key="separator-start" page={1} disabled={true}>
    <span>...</span>
  </PaginationItem>
);

export const PaginationNumberItem = ({
  page,
  range,
  handleChange,
  hrefTemplate,
}: PaginationNumberItemProps) =>
  Array.from({ length: range[1] - range[0] + 1 }).map((_, index) => {
    const numberIndex = range[0] + index;

    return (
      <PaginationItem
        key={`number-${numberIndex}`}
        page={numberIndex}
        disabled={false}
        selected={numberIndex === page}
        handleChange={() => handleChange && handleChange(numberIndex)}
        hrefTemplate={hrefTemplate}
      >
        <span>{numberIndex}</span>
      </PaginationItem>
    );
  });

'use client';

import { useEffect, useState } from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import {
  getFixedPage,
  getHrefTemplate,
  getPageIndexFromSearchParameters,
} from './pagination.utils';

import {
  PaginationEdgeItem,
  PaginationSeparatorItem,
  PaginationNumberItem,
} from './components/PaginationItem';

import type { PaginationProps } from './pagination.types';

export const Pagination = ({
  className,
  page = 1,
  count,
  boundaryCount = 1,
  siblingCount = 1,
  handleChange,
  searchParamName,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(getFixedPage(page, count));
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const [hrefTemplate, setHrefTemplate] = useState(
    pathname && searchParameters && searchParamName
      ? getHrefTemplate(pathname, searchParameters.toString(), searchParamName)
      : '',
  );

  useEffect(() => {
    setCurrentPage(getFixedPage(page, count));
  }, [page, count]);

  useEffect(() => {
    if (pathname && searchParameters && searchParamName) {
      setHrefTemplate(getHrefTemplate(pathname, searchParameters.toString(), searchParamName));
      setCurrentPage(
        getPageIndexFromSearchParameters(searchParameters.toString(), searchParamName),
      );
    }
  }, [pathname, searchParameters, searchParamName]);

  const handlePageChange = (value: number) => {
    setCurrentPage(getFixedPage(value, count));
    handleChange && handleChange(getFixedPage(value, count));
  };

  const buttonsCount = boundaryCount * 2 + siblingCount * 2 + 1 + 2;
  const minPageIndexForSeparator = 1 + boundaryCount + 1 + siblingCount * 2 + 1;
  const maxPageIndexForSeparator = count - boundaryCount - 1 - siblingCount * 2 - 1;

  return (
    <nav className="relative">
      <ol className='flex justify-center align-middle gap-1'>
        {count > Math.max(buttonsCount, minPageIndexForSeparator * 2 - 1)
          ? [
              <PaginationEdgeItem
                key="prev"
                page={currentPage - 1}
                type="prev"
                disabled={currentPage === 1}
                handleChange={handlePageChange}
                hrefTemplate={hrefTemplate}
              />,
              <PaginationNumberItem
                key="bounding-start"
                page={currentPage}
                range={[
                  1,
                  currentPage < minPageIndexForSeparator
                    ? minPageIndexForSeparator
                    : 1 + boundaryCount,
                ]}
                handleChange={handlePageChange}
                hrefTemplate={hrefTemplate}
              />,
              currentPage >= minPageIndexForSeparator && (
                <PaginationSeparatorItem key="separator-start" />
              ),
              currentPage >= minPageIndexForSeparator &&
                currentPage <= maxPageIndexForSeparator && (
                  <PaginationNumberItem
                    key="siblings"
                    page={currentPage}
                    range={[currentPage - siblingCount, currentPage + siblingCount]}
                    handleChange={handlePageChange}
                    hrefTemplate={hrefTemplate}
                  />
                ),
              currentPage <= maxPageIndexForSeparator && (
                <PaginationSeparatorItem key="separator-end" />
              ),
              <PaginationNumberItem
                key="bounding-end"
                page={currentPage}
                range={[
                  currentPage > maxPageIndexForSeparator
                    ? maxPageIndexForSeparator
                    : count - boundaryCount,
                  count,
                ]}
                handleChange={handlePageChange}
                hrefTemplate={hrefTemplate}
              />,
              <PaginationEdgeItem
                key="next"
                page={currentPage + 1}
                type="next"
                disabled={currentPage === count}
                handleChange={handlePageChange}
                hrefTemplate={hrefTemplate}
              />,
            ]
          : [
              count > 1 && (
                <PaginationEdgeItem
                  key="prev"
                  page={currentPage - 1}
                  type="prev"
                  disabled={currentPage === 1}
                  handleChange={handlePageChange}
                  hrefTemplate={hrefTemplate}
                />
              ),
              ,
              <PaginationNumberItem
                key="number"
                page={currentPage}
                range={[1, count]}
                handleChange={handlePageChange}
                hrefTemplate={hrefTemplate}
              />,
              count > 1 && (
                <PaginationEdgeItem
                  key="next"
                  page={currentPage + 1}
                  type="next"
                  disabled={currentPage === count}
                  handleChange={handlePageChange}
                  hrefTemplate={hrefTemplate}
                />
              ),
            ]}
      </ol>
    </nav>
  );
};

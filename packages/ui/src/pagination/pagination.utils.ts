export const getFixedPage = (page: number, count: number): number =>
  Math.min(Math.max(1, page), count);

export const getHrefTemplate = (
  pathname: string,
  searchParameters: string,
  searchParamName: string,
): string => {
  const parameters = new URLSearchParams(searchParameters);
  parameters.set(searchParamName, '{page}');
  return `${pathname}?${parameters.toString()}`;
};

export const getPageIndexFromSearchParameters = (
  searchParameters: string,
  searchParamName: string,
): number => {
  const parameters = new URLSearchParams(searchParameters);
  return Number.parseInt(parameters.get(searchParamName) ?? '1', 10);
};

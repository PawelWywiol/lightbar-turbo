export const logBase = (value: number, base: number): number =>
	Math.log(value) / Math.log(base);
export const formatToFixed = (value: number, decimals: number): string =>
	value.toFixed(decimals);

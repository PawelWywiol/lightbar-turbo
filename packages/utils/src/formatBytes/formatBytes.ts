import { BASE, SIZES } from "./formatBytes.config";
import { formatToFixed, logBase } from "./formatBytes.utils";

export const formatBytes = (bytes: number, decimals = 2): string => {
	if (bytes === 0) return `0 ${SIZES[0]}`;

	const dm = Math.max(decimals, 0);
	const index = Math.floor(logBase(bytes, BASE));
	const value = bytes / BASE ** index;

	return `${formatToFixed(value, dm)} ${SIZES[index]}`;
};

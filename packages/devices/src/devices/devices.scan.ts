import {
	CONNECTED_DEVICE_API_DEFAULT_PATH,
	SUBNETS_IPS,
} from "./devices.config";
import { isIPAddress, progressPercentage } from "./devices.utils";

const DEVICE_SCAN_DEFAULT_SCHEMA = "http";
const DEVICE_SCAN_DEFAULT_PATH = "/";
const DEVICE_SCAN_DEFAULT_TIMEOUT = 120;
const DEVICE_SCAN_DEFAULT_METHOD = "GET";

const checkIPConnection = async (
	ip: string,
	{
		schema = DEVICE_SCAN_DEFAULT_SCHEMA,
		path = DEVICE_SCAN_DEFAULT_PATH,
		timeout = DEVICE_SCAN_DEFAULT_TIMEOUT,
		method = DEVICE_SCAN_DEFAULT_METHOD,
	}: {
		schema?: string | undefined;
		path?: string | undefined;
		timeout?: number | undefined;
		method?: string | undefined;
	} = {},
) => {
	if (!isIPAddress(ip)) {
		return null;
	}

	const controller = new AbortController();
	const { signal } = controller;

	const config: RequestInit = {
		signal: signal,
		method: method,
		mode: "no-cors",
		headers: {
			"cache-control": "cache",
			pragma: "cache",
		},
		credentials: "omit",
	};

	let checkResult: string | null = ip;

	try {
		await Promise.race([
			fetch(`${schema}://${ip}${path}`, config),
			new Promise((_, reject) =>
				setTimeout(() => {
					controller.abort();
					checkResult = null;
					reject(
						new Error(
							`Timeout of ${timeout}ms reached while trying to connect to ${schema}://${ip}${path}`,
						),
					);
				}, timeout),
			),
		]);
	} catch {
		if (path !== DEVICE_SCAN_DEFAULT_PATH) {
			checkResult = null;
		}
	}

	return checkResult;
};

const scanSubnetForConnectedDevices = async (
	subnet: string,
	currentProgress: number,
	maxProgress: number,
	setScanProgress: (number: number) => void,
) => {
	const ipParts = subnet.split(".");
	const subnetIps = Array.from(
		{ length: 256 },
		(_, index) => `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.${index}`,
	);

	const ips = [];

	for (const [index, ip] of subnetIps.entries()) {
		ips.push(
			await checkIPConnection(ip === subnet ? "" : ip, {
				path: CONNECTED_DEVICE_API_DEFAULT_PATH,
			}),

			setScanProgress(progressPercentage(index, currentProgress, maxProgress)),
		);
	}

	return ips;
};

export const findLocalNetworkConnectedDevices = async (
	setScanProgress: (number: number) => void,
) => {
	setScanProgress(0);

	const activeSubnets = await Promise.all(
		SUBNETS_IPS.map(async (ip) => checkIPConnection(ip)),
	);

	const maxProgress = activeSubnets.filter(Boolean).length * 256;

	const activeIps = [];

	for (const [index, activeSubnet] of activeSubnets.filter(Boolean).entries()) {
		activeIps.push(
			await scanSubnetForConnectedDevices(
				activeSubnet ?? "",
				index * 256,
				maxProgress,
				setScanProgress,
			),
		);
	}

	setScanProgress(100);

	return activeIps.flat().filter(Boolean) as string[];
};

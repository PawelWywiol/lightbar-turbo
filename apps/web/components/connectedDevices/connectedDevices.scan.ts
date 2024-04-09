import { APP_NAME } from 'config/app';

import { SUBNETS_IPS } from './connectedDevices.config';
import { isIPAddress } from './connectedDevices.utils';

const checkIPConnection = async (ip: string, search?: string | undefined) => {
  if (!isIPAddress(ip)) {
    return null;
  }

  const controller = new AbortController();
  const { signal } = controller;

  const config: RequestInit = {
    signal: signal,
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
  };

  let checkResult: string | null = ip;

  try {
    const response = await Promise.race([
      fetch(`http://${ip}`, config),
      new Promise((_, reject) =>
        setTimeout(() => {
          controller.abort();
          checkResult = null;
          reject();
        }, 500),
      ),
    ]);
    console.log({ ip, response });
    if (search) {
      if (response instanceof Response && response.ok) {
        const html = await response.text();
        checkResult = html.includes(search) ? ip : null;
      } else {
        checkResult = null;
      }
    }
  } catch {
    if (search) {
      checkResult = null;
    }
  }

  return checkResult;
};

const scanSubnetForConnectedDevices = async (subnet: string) => {
  const ipParts = subnet.split('.');
  const subnetIps = Array.from(
    { length: 256 },
    (_, index) => `${ipParts[0]}.${ipParts[1]}.${ipParts[2]}.${index}`,
  );

  return await Promise.all(subnetIps.map(async (ip) => checkIPConnection(ip, APP_NAME)));
};

export const findLocalNetworkConnectedDevices = async () => {
  const activeSubnets = await Promise.all(SUBNETS_IPS.map(async (ip) => checkIPConnection(ip)));

  const activeIps = await Promise.all(
    activeSubnets.map(async (ip) => scanSubnetForConnectedDevices(ip ?? '')),
  );

  console.log({ activeSubnets, activeIps });

  return activeIps.flat().filter(Boolean) as string[];
};

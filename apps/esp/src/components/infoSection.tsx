import { formatBytes } from 'utils/formatBytes';

import type { ConnectionResponseData } from 'devices/connections.types';

export const InfoSection = ({ info }: { info?: ConnectionResponseData | undefined }) => (
  <section className="container m-auto max-w-md w-full flex flex-col gap-4 text-center">
    {info?.data && (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">access point :</span>
          <span className="text-right text-xs flex-1">{info.data.ap}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">leds :</span>
          <span className="text-right text-xs flex-1">{info.data.leds}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">space :</span>
          <span className="text-right text-xs flex-1">{formatBytes(info.data.space)}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">heap :</span>
          <span className="text-right text-xs flex-1">{formatBytes(info.data.heap)}</span>
        </div>
      </div>
    )}
  </section>
);

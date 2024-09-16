import { formatBytes } from 'utils/formatBytes';

import type { ConnectionResponseData } from 'devices/connections.types';

export const InfoSection = ({ info }: { info?: ConnectionResponseData | undefined }) => (
  <section className="container m-auto max-w-md w-full flex flex-col gap-4 text-center">
    {info?.data && (
      <div className="flex flex-col gap-1">
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">uid :</span>
          <span className="text-right text-xs flex-1">{info.data.uid}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">leds :</span>
          <span className="text-right text-xs flex-1">{info.data.leds}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-2">
          <span className="text-right text-sm font-bold">space :</span>
          <span className="text-right text-xs flex-1">{formatBytes(info.data.space)}</span>
        </div>
        {info.data.host && (
          <div className="flex flex-row justify-center items-center gap-2">
            <span className="text-right text-sm font-bold">host :</span>
            <span className="text-right text-xs flex-1">{info.data.host}</span>
          </div>
        )}
      </div>
    )}
  </section>
);

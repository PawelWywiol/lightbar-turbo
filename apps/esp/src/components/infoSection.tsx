import type { ConnectionResponseData } from 'devices/connections.types';

export const InfoSection = ({ info }: { info?: ConnectionResponseData | undefined }) => (
  <section className="container m-auto w-sm max-w-full-gap flex flex-col gap-4 text-center">
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
      </div>
    )}
  </section>
);

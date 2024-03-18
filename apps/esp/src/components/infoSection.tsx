import type { ConnectionResponseData } from 'config/connections.types';

export const InfoSection = ({ info }: { info?: ConnectionResponseData | undefined }) => (
  <section className="m-auto max-w-md w-full flex flex-col gap-4 text-center">
    {info?.data && (
      <table className="text-xs">
        <tbody>
          {Object.entries(info.data).map(([key, value]) => (
            <tr key={key}>
              <td className="text-right">{key}</td>
              <td className="text-left">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </section>
);

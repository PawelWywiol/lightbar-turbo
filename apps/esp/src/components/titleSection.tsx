import { APP_NAME } from 'config/app';

import type { Message } from 'config/messages.types';

export const TitleSection = ({ message }: { message?: Message | undefined }) => (
  <section className="m-auto max-w-md w-full flex flex-col gap-4 text-center">
    <h1>{APP_NAME}</h1>
    {!!message?.message.length && (
      <p>
        <small>{message.message}</small>
      </p>
    )}
  </section>
);

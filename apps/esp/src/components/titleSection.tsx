import { APP_NAME } from 'config/app';

export const TitleSection = ({ message }: { message?: string | undefined }) => (
  <section className="m-auto max-w-md w-full flex flex-col gap-4 text-center">
    <h1 className='text-xl'>{APP_NAME}</h1>
    {!!message?.length && <p className='text-sm'>{message}</p>}
  </section>
);

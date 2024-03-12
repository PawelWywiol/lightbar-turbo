import { APP_NAME } from 'config/app';

export const TitleSection = () => (
  <section className="m-auto max-w-md w-full flex flex-col gap-4 text-center">
    <h1>{APP_NAME}</h1>
  </section>
);

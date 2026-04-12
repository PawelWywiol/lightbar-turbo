import { APP_NAME } from 'config/app';

export const TitleSection = () => (
  <section className="m-auto w-sm max-w-full-gap flex flex-col gap-4 text-center">
    <h1 className="text-xl">{APP_NAME}</h1>
  </section>
);

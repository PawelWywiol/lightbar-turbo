import { APP_NAME } from 'config/src/app/app';
import { cx } from 'cva';

export const App = () => {
  return (
    <main className={cx('relative')}>
      <section className="m-auto max-w-md w-full flex flex-col gap-4">
        <h1>{APP_NAME}</h1>
      </section>
    </main>
  );
};

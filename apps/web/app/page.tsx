import { Header } from 'ui';
import { cx } from 'cva';

import styles from './page.module.scss';

const Page = () => {
  return (
    <>
      <Header />
      <main className={cx(styles['main'], 'container', 'indent')}></main>
    </>
  );
};

export default Page;

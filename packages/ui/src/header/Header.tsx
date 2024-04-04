import type { ReactNode } from 'react';

import Link from 'next/link';

import { headerStyles } from './header.styles';

export const Header = ({ title, children }: { title: string; children: ReactNode }) => (
  <header className={headerStyles({ className: 'container p-4 mb-8' })}>
    <div className={'flex justify-between'}>
      <h1>
        <Link href="/">{title}</Link>
      </h1>
      <nav>{children}</nav>
    </div>
  </header>
);

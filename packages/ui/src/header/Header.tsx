import type { ReactNode } from 'react';

import { headerStyles } from './header.styles';

export const Header = ({ title, children }: { title: string; children: ReactNode }) => (
  <header className={headerStyles({ className: 'p-4 mb-8' })}>
    <div className="container">
      <div className={'flex justify-between'}>
        <h1>{title}</h1>
        <nav>{children}</nav>
      </div>
    </div>
  </header>
);

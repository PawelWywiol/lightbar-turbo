import type { ReactNode } from 'react';

import Link from 'next/link';

export const Header = ({ title, children }: { title: string; children: ReactNode }) => (
  <header className="container p-4">
    <div className="flex justify-between items-center">
      <h1>
        <Link href="/">{title}</Link>
      </h1>
      <nav className="[&_ul]:flex [&_ul]:flex-row [&_ul]:justify-items-start [&_ul]:items-center [&_ul]:list-none [&_ul]:gap-4">
        {children}
      </nav>
    </div>
  </header>
);

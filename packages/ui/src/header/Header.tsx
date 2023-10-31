import Link from 'next/link';

import { headerStyles } from './header.styles';

export const Header = () => (
  <header className={headerStyles({ className: 'container indent' })}>
    <h1>Lightbar</h1>
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/editor">Editor</Link>
        </li>
      </ul>
    </nav>
  </header>
);

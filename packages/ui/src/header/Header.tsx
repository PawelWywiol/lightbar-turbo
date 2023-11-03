import Link from 'next/link';
import { Container, Flex } from '@radix-ui/themes';

import { headerStyles } from './header.styles';

export const Header = () => (
  <header className={headerStyles()}>
    <Container>
      <Flex justify="between" align="center" px="4">
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
      </Flex>
    </Container>
  </header>
);

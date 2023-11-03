import type { ReactNode } from 'react';

import { Container, Flex } from '@radix-ui/themes';

import { headerStyles } from './header.styles';

export const Header = ({ title, children }: { title: string; children: ReactNode }) => (
  <header className={headerStyles()}>
    <Container>
      <Flex justify="between" align="center" px="4">
        <h1>{title}</h1>
        <nav>{children}</nav>
      </Flex>
    </Container>
  </header>
);

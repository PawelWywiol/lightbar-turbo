import type { ReactNode } from 'react';

import Link from 'next/link';
import { Tilt_Warp } from 'next/font/google';
import { cx } from 'cva';
import { Header } from 'ui/header';
import { Theme } from 'ui/theme';
import { APP_NAME } from 'config/app';

import 'ui/theme/styles/tailwindTheme.ts';
import 'ui/theme/styles/radixTheme.ts';
import 'ui/theme/styles/globals.ts';

const TiltWarpFont = Tilt_Warp({
  display: 'swap',
  weight: '400',
  variable: '--app-default-font-family',
  subsets: ['latin-ext'],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cx(TiltWarpFont.variable, 'relative')}>
        <Theme appearance="dark" accentColor="amber" grayColor="slate" radius="small">
          <Header title={APP_NAME}>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/editor">Editor</Link>
              </li>
            </ul>
          </Header>
          {children}
        </Theme>
      </body>
    </html>
  );
};

export default RootLayout;

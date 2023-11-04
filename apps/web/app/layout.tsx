import type { ReactNode } from 'react';

import Link from 'next/link';
import { APP_NAME } from 'config';
import { Theme, Header } from 'ui';
import { Tilt_Warp } from 'next/font/google';
import 'ui/src/theme/styles/globals.scss';

const TiltWarpFont = Tilt_Warp({
  display: 'swap',
  weight: '400',
  variable: '--app-default-font-family',
  subsets: ['latin-ext'],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={TiltWarpFont.variable}>
        <Theme appearance="dark">
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

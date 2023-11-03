import type { ReactNode } from 'react';

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
    <html lang="en" className={TiltWarpFont.variable}>
      <body>
        <Theme appearance="dark">
          <Header />
          {children}
        </Theme>
      </body>
    </html>
  );
};

export default RootLayout;

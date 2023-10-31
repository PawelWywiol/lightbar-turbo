import type { ReactNode } from 'react';

import { Tilt_Warp } from 'next/font/google';

import 'ui/src/theme/styles/globals.scss';

const TiltWarpFont = Tilt_Warp({
  display: 'swap',
  weight: '400',
  variable: '--default-font-family',
  subsets: ['latin-ext'],
});

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" className={TiltWarpFont.variable}>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;

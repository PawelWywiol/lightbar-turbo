import type { ReactNode } from 'react';

import Link from 'next/link';
import { Header } from 'ui/header';
import { Theme } from 'ui/theme';
import { APP_NAME } from 'config/app';

import { ConnectedDevicesProvider } from '../components/connectedDevices/connectedDevices.provider';
import { ConnectedDevicesDialog } from '../components/connectedDevices/connectedDevices.dialog';

import 'ui/theme/styles/tailwindTheme.ts';
import 'ui/theme/styles/radixTheme.ts';
import 'ui/theme/styles/globals.ts';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative">
        <Theme appearance="dark" accentColor="amber" grayColor="slate" radius="small">
          <ConnectedDevicesProvider>
            <Header title={APP_NAME}>
              <ul>
                <li>
                  <Link href="/editor">Editor</Link>
                </li>
                <li>
                  <ConnectedDevicesDialog />
                </li>
              </ul>
            </Header>
            {children}
          </ConnectedDevicesProvider>
        </Theme>
      </body>
    </html>
  );
};

export default RootLayout;

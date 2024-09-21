import type { ReactNode } from 'react';

import Link from 'next/link';
import { Header } from 'ui/header';
import { APP_NAME } from 'config/app';
import { ConnectedDevicesProvider } from 'devices/devices.provider';

import { ConnectedDevicesDialog } from './components/connectedDevicesDialog';

import 'ui/theme/styles/tailwindTheme.ts';
import 'ui/theme/styles/globals.ts';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className="relative dark">
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
      </body>
    </html>
  );
};

export default RootLayout;

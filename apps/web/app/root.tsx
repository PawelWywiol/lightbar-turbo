import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { APP_NAME } from 'config/app';
import { ConnectedDevicesProvider } from 'devices/devices.provider';

import { ConnectedDevicesDialog } from '../components/connectedDevice/connectedDevicesDialog';

import type { LinksFunction } from '@remix-run/node';

import 'ui/theme/styles/tailwindTheme.ts';
import 'ui/theme/styles/globals.ts';

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="relative dark">
        <ConnectedDevicesProvider>
          <header className="container p-4">
            <div className="flex justify-between items-center">
              <h1>
                <Link to="/">{APP_NAME}</Link>
              </h1>
              <nav className="[&_ul]:flex [&_ul]:flex-row [&_ul]:justify-items-start [&_ul]:items-center [&_ul]:list-none [&_ul]:gap-4">
                <ul>
                  <li>
                    <Link to="/editor">Editor</Link>
                  </li>
                  <li>
                    <ConnectedDevicesDialog />
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="flex-1 relative flex flex-col">{children}</main>
        </ConnectedDevicesProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

const App = () => {
  return <Outlet />;
};

export default App;

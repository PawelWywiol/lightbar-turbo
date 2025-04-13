import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";
import { ConnectedDevicesProvider } from "devices/devices.provider";

import { PageHeader } from "../components/pageHeader/pageHeader";

import "ui/theme/styles/tailwindTheme.ts";

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
					<PageHeader />
					<main className="flex-1 relative flex flex-col">{children}</main>
				</ConnectedDevicesProvider>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
};

const App = () => <Outlet />;

export default App;

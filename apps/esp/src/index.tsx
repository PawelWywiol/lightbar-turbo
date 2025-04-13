import { render } from "preact";

import { App } from "./App.js";

import "ui/theme/styles/tailwindTheme.ts";

const root = document.querySelector("#root");

if (!root) {
	throw new Error("Root element not found");
}

render(<App />, root);

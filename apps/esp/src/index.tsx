import { render } from 'preact';

import { App } from './App.js';

import 'ui/theme/styles/tailwindTheme.ts';
import 'ui/theme/styles/globals.ts';

const root = document.querySelector('#root');

render(<App />, root!);

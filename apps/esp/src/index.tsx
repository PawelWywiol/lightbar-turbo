import { render } from 'preact';

import { App } from './App';

import './index.scss';

const root = document.querySelector('#root');

render(<App />, root!);

import type { LightsScheme, LightsSizeOption } from 'config';

export interface EditorProps {
  sizes: LightsSizeOption[];
  scheme: LightsScheme;
  onChange: (scheme: LightsScheme) => void;
}

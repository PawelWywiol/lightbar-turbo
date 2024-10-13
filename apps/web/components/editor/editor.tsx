'use client';

import { LightsFrameGrid } from './components/lightsFrameGrid/lightsFrameGrid';
import { LightsFrameTools } from './components/lightsFrameTools';
import { StateTools } from './components/stateTools';
import { EditorProvider } from './editor.provider';
import { ShiftTools } from './components/shiftTools';

import type { EditorProps } from './editor.types';

export const Editor = ({ lightsSchemeData }: EditorProps) => {
  return (
    <EditorProvider initialSchemeData={lightsSchemeData}>
      <div className="m-auto w-sm max-w-full-gap flex flex-col gap-4 py-4">
        <ShiftTools />
        <LightsFrameGrid />
        <LightsFrameTools />
        <StateTools />
      </div>
    </EditorProvider>
  );
};

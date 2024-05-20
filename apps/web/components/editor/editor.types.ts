import type { LightsScheme, LightsSchemeData } from 'config/lights.types';

export type ShiftDirection = 'up' | 'down' | 'left' | 'right' | 'prev' | 'next' | 'shuffle';

export interface EditorProps {
  schemeData: LightsSchemeData;
  onSave: (schemeData: LightsSchemeData) => void;
}

export interface EditorFrameProps {
  scheme: LightsScheme;
  handleUpdate: (newScheme: LightsScheme) => void;
  frameIndex: number;
  nextFrame?: () => void;
  previousFrame?: () => void;
}

export interface EditorSchemeUpdateEvent {
  name: 'app:editor:scheme:update';
  detail: {
    scheme: LightsScheme;
    frameIndex: number;
  };
}

export interface EditorColorUpdateEvent {
  name: 'app:editor:color:update';
  detail: string | undefined;
}

export interface EditorSchemeSaveEvent {
  name: 'app:editor:scheme:save';
  detail: {
    uid: string;
    scheme: LightsScheme;
  };
}

'use client';

import { useState } from 'react';

import { Pagination } from '../pagination/pagination';
import { LightsFrameGrid } from './components/lightsFrameGrid/lightsFrameGrid';
import { LightsSchemeTools } from './components/lightsSchemeTools/lightsSchemeTools';
import { LightsFrameTools } from './components/lightsFrameTools/lightsFrameTools';

import { EDITOR_DEFAULT_TOOL } from './editor.config';
import { EditorTools } from './components/editorTools/editorTools';

import type { EditorProps } from './editor.types';
import { shiftLightsFrameColorPixel } from './editor.utils';

export const Editor = ({ scheme, setScheme }: EditorProps) => {
  const [frameIndex, setFrameIndex] = useState(0);
  const [tool, setTool] = useState(EDITOR_DEFAULT_TOOL);
  const [colorIndex, setColorIndex] = useState(0);

  return (
    <div className="m-auto max-w-md w-full flex flex-col gap-4">
      <div className="flex justify-between content-center px-4">
        <div className="flex">
          <EditorTools
            tool={tool}
            setTool={setTool}
            colorIndex={colorIndex}
            setColorIndex={setColorIndex}
            colors={scheme.colors}
            shiftLightsFrameColorPixel={(direction) => {
              setScheme(shiftLightsFrameColorPixel(scheme, frameIndex, direction));
            }}
          />
        </div>
        <div className="flex">
          <LightsSchemeTools scheme={scheme} setScheme={setScheme} />
        </div>
      </div>
      <LightsFrameGrid
        colorIndex={colorIndex}
        frameIndex={frameIndex}
        scheme={scheme}
        setScheme={setScheme}
      />
      <LightsFrameTools
        frameIndex={frameIndex}
        scheme={scheme}
        setScheme={setScheme}
        nextFrame={() =>
          setFrameIndex((prevFrameIndex) =>
            prevFrameIndex + 1 < scheme.frames.length ? prevFrameIndex + 1 : prevFrameIndex,
          )
        }
        previousFrame={() =>
          setFrameIndex((prevFrameIndex) => (prevFrameIndex > 0 ? prevFrameIndex - 1 : 0))
        }
      />
      <Pagination
        page={frameIndex + 1}
        handleChange={(selectedFrameIndex) => setFrameIndex(selectedFrameIndex - 1)}
        count={scheme.frames.length}
        siblingCount={0}
        boundaryCount={0}
      />
    </div>
  );
};

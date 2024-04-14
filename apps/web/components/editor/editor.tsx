'use client';

import { Suspense } from 'react';

import { Pagination } from 'ui/pagination';

import { LightsFrameGrid } from './components/lightsFrameGrid/lightsFrameGrid';
import { LightsSchemeTools } from './components/lightsSchemeTools/lightsSchemeTools';
import { LightsFrameTools } from './components/lightsFrameTools/lightsFrameTools';
import { EditTools } from './components/editTools/editTools';
import { shiftLightsFrameColorPixel } from './editor.utils';
import { StateTools } from './components/stateTools/stateTools';
import { useEditor } from './editor.hooks';

import type { EditorProps } from './editor.types';

export const Editor = ({ schemeData, device, setDevice, handleSave }: EditorProps) => {
  const {
    updatedSchemeData: { scheme, uid, updatedAt },
    handleUpdate,
    undoAvailable,
    handleUndo,
    redoAvailable,
    handleRedo,
    frameIndex,
    setFrameIndex,
    tool,
    setTool,
    colorIndex,
    setColorIndex,
  } = useEditor(schemeData);

  return (
    <div className="m-auto max-w-md w-full flex flex-col gap-4">
      <div className="flex justify-between content-center px-4">
        <div className="flex">
          <EditTools
            tool={tool}
            setTool={setTool}
            colorIndex={colorIndex}
            setColorIndex={setColorIndex}
            colors={scheme.colors}
            shiftLightsFrameColorPixel={(direction) => {
              handleUpdate(shiftLightsFrameColorPixel(scheme, frameIndex, direction, device));
            }}
          />
        </div>
        <div className="flex">
          <LightsSchemeTools device={device} setDevice={setDevice} />
        </div>
      </div>
      <LightsFrameGrid
        colorIndex={colorIndex}
        frameIndex={frameIndex}
        scheme={scheme}
        handleUpdate={handleUpdate}
        device={device}
      />
      <LightsFrameTools
        frameIndex={frameIndex}
        scheme={scheme}
        handleUpdate={handleUpdate}
        nextFrame={() =>
          setFrameIndex((previousFrameIndex) =>
            previousFrameIndex + 1 < scheme.frames.length
              ? previousFrameIndex + 1
              : previousFrameIndex,
          )
        }
        previousFrame={() =>
          setFrameIndex((previousFrameIndex) =>
            previousFrameIndex > 0 ? previousFrameIndex - 1 : 0,
          )
        }
      />
      <Suspense>
        <Pagination
          page={frameIndex + 1}
          handleChange={(selectedFrameIndex) => setFrameIndex(selectedFrameIndex - 1)}
          count={scheme.frames.length}
          siblingCount={0}
          boundaryCount={0}
        />
      </Suspense>
      <StateTools
        scheme={scheme}
        handleUpdate={handleUpdate}
        undoAvailable={undoAvailable}
        handleUndo={handleUndo}
        redoAvailable={redoAvailable}
        handleRedo={handleRedo}
        handleSave={() => handleSave({ scheme, uid, updatedAt })}
      />
    </div>
  );
};

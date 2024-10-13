import { CopyPlus, StepBack, StepForward } from 'lucide-react';
import { LIGHTS_FRAME_TEMPO_OPTIONS, LIGHTS_FRAME_TYPES } from 'devices/lights.config';
import { SelectWrapper } from 'ui/select';
import { DropDownMenuWrapper } from 'ui/dropdownMenu';
import { Button } from 'ui/button';

import { useEditor } from '../editor.provider';

import { ColorTools } from './colorTools';

import type { LightsScheme } from 'devices/lights.types';

export const LightsFrameTools = () => {
  const {
    lightsScheme,
    frameIndex,
    framesCount,
    nextFrame,
    nextFrameAvailable,
    previousFrame,
    previousFrameAvailable,
    handleUpdate,
  } = useEditor();
  const frame = lightsScheme.scheme.frames[frameIndex];

  if (!frame) {
    return null;
  }

  return (
    <div className="flex justify-between content-center flex-wrap gap-2">
      <div className="flex gap-2 flex-grow">
        <SelectWrapper
          options={LIGHTS_FRAME_TYPES.map((option) => ({
            value: `${option.value}`,
            label: option.label,
          }))}
          value={`${frame.type}`}
          onChange={(value) => {
            const updatedScheme: LightsScheme = { ...lightsScheme.scheme };
            const updatedSchemeFrame = updatedScheme.frames[frameIndex];
            const type = LIGHTS_FRAME_TYPES.find((option) => `${option.value}` === value);

            if (!type || !updatedSchemeFrame) {
              return;
            }

            updatedSchemeFrame.type = type.value;

            handleUpdate(updatedScheme);
          }}
        />
        <SelectWrapper
          options={LIGHTS_FRAME_TEMPO_OPTIONS}
          value={`${frame.tempo}`}
          onChange={(value) => {
            const updatedScheme: LightsScheme = { ...lightsScheme.scheme };
            const updatedSchemeFrame = updatedScheme.frames[frameIndex];
            const temporary = Number.parseInt(value, 10);

            if (!temporary || !updatedSchemeFrame) {
              return;
            }

            updatedSchemeFrame.tempo = temporary;

            handleUpdate(updatedScheme);
          }}
        />
        <ColorTools />
      </div>
      <div className="flex gap-2 flex-grow">
        <Button disabled={!previousFrameAvailable} onClick={previousFrame}>
          <StepBack />
        </Button>
        <DropDownMenuWrapper
          trigger={
            <Button className="flex flex-1 gap-2 text-muted-foreground text-xs" asChild>
              <span>
                <span>{`${frameIndex + 1} : ${framesCount}`}</span>

                <CopyPlus />
              </span>
            </Button>
          }
          options={[
            {
              label: 'Copy',
              onClick: () => {
                const newFrame = structuredClone(frame);
                const updatedScheme: LightsScheme = { ...lightsScheme.scheme };
                updatedScheme.frames.splice(frameIndex, 0, newFrame);
                handleUpdate(updatedScheme);
                nextFrame();
              },
            },
            {
              label: 'Delete',
              onClick: () => {
                if (lightsScheme.scheme.frames.length === 1) {
                  return;
                }

                const updatedScheme: LightsScheme = { ...lightsScheme.scheme };
                updatedScheme.frames.splice(frameIndex, 1);
                handleUpdate(updatedScheme);
                previousFrame();
              },
            },
          ]}
        />
        <Button disabled={!nextFrameAvailable} onClick={nextFrame}>
          <StepForward />
        </Button>
      </div>
    </div>
  );
};

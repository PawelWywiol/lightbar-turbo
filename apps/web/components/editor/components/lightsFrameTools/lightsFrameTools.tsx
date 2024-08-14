import { LIGHTS_FRAME_TEMPO_OPTIONS, LIGHTS_FRAME_TYPES } from 'devices/lights.config';
import { Select } from 'ui/select';
import { Button } from 'ui/button';
import { DropDownMenu } from 'ui/dropdownMenu';

import { PlusIcon } from '../../../../../../packages/ui/src/icons/icons';

import type { LightsScheme } from 'devices/lights.types';
import type { EditorFrameProps } from '../../editor.types';

export const LightsFrameTools = ({
  scheme,
  handleUpdate,
  frameIndex,
  nextFrame,
  previousFrame,
}: EditorFrameProps) => {
  const frame = scheme.frames[frameIndex];

  if (!frame) {
    return null;
  }

  return (
    <div className="flex justify-between content-center px-4">
      <div className="flex gap-2">
        <Select
          options={LIGHTS_FRAME_TYPES.map((option) => ({
            value: `${option.value}`,
            label: option.label,
          }))}
          value={`${frame.type}`}
          onChange={(value) => {
            const updatedScheme: LightsScheme = { ...scheme };
            const updatedSchemeFrame = updatedScheme.frames[frameIndex];
            const type = LIGHTS_FRAME_TYPES.find((option) => `${option.value}` === value);

            if (!type || !updatedSchemeFrame) {
              return;
            }

            updatedSchemeFrame.type = type.value;

            handleUpdate(updatedScheme);
          }}
        />
        <Select
          options={LIGHTS_FRAME_TEMPO_OPTIONS}
          value={`${frame.tempo}`}
          onChange={(value) => {
            const updatedScheme: LightsScheme = { ...scheme };
            const updatedSchemeFrame = updatedScheme.frames[frameIndex];
            const temporary = Number.parseInt(value, 10);

            if (!temporary || !updatedSchemeFrame) {
              return;
            }

            updatedSchemeFrame.tempo = temporary;

            handleUpdate(updatedScheme);
          }}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() => {
            const newFrame = structuredClone(frame);
            const updatedScheme: LightsScheme = { ...scheme };
            updatedScheme.frames.splice(frameIndex, 0, newFrame);
            handleUpdate(updatedScheme);
            nextFrame && nextFrame();
          }}
        >
          <PlusIcon />
        </Button>
        <DropDownMenu
          options={[
            {
              label: 'Delete',
              onClick: () => {
                if (scheme.frames.length === 1) {
                  return;
                }

                const updatedScheme: LightsScheme = { ...scheme };
                updatedScheme.frames.splice(frameIndex, 1);
                handleUpdate(updatedScheme);
                previousFrame && previousFrame();
              },
            },
          ]}
        />
      </div>
    </div>
  );
};

import { IconButton } from '@radix-ui/themes';
import { LIGHTS_FRAME_TEMPO_OPTIONS, LIGHTS_FRAME_TYPES, LightsScheme } from 'config';

import { Select } from '../../../select/select';

import type { EditorFrameProps } from '../../editor.types';
import { PlusIcon } from '../../../icons';
import { Button } from '../../../button/button';

export const LightsFrameTools = ({ scheme, setScheme, frameIndex }: EditorFrameProps) => {
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
            const type = LIGHTS_FRAME_TYPES.find((option) => option.value === value);

            if (!type || !updatedSchemeFrame) {
              return;
            }

            updatedSchemeFrame.type = type.value;

            setScheme(updatedScheme);
          }}
        />
        <Select
          options={LIGHTS_FRAME_TEMPO_OPTIONS}
          value={`${frame.tempo}`}
          onChange={(value) => {
            const updatedScheme: LightsScheme = { ...scheme };
            const updatedSchemeFrame = updatedScheme.frames[frameIndex];
            const temp = parseInt(value, 10);

            if (!temp || !updatedSchemeFrame) {
              return;
            }

            updatedSchemeFrame.tempo = temp;

            setScheme(updatedScheme);
          }}
        />
      </div>
      <div>
        <Button>
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

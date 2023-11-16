import { LIGHTS_FRAME_SIZES } from 'config';

import { Select } from '../../../select/select';

import type { EditorProps } from '../../editor.types';

export const LightsSchemeTools = ({ scheme, setScheme }: EditorProps) => (
  <div className="flex justify-between content-center px-4">
    <div></div>
    <div>
      <Select
        options={LIGHTS_FRAME_SIZES.map((option) => ({
          value: `${option.value}`,
          label: option.label,
        }))}
        value={`${scheme.size.value}`}
        onChange={(value) => {
          const size = LIGHTS_FRAME_SIZES.find(
            (option) => option.value === Number.parseInt(value, 10),
          );

          size && setScheme({ ...scheme, size });
        }}
      />
    </div>
  </div>
);

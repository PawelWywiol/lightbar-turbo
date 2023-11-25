import { LIGHTS_FRAME_SIZES } from 'config';

import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';

import type { EditorProps } from '../../editor.types';

export const LightsSchemeTools = ({
  scheme,
  handleUpdate,
}: Pick<EditorProps, 'scheme' | 'handleUpdate'>) => (
  <div className="flex">
    <DropDownMenu
      options={LIGHTS_FRAME_SIZES.map((size) => ({
        label: size.label,
        onClick: () => handleUpdate({ ...scheme, size }),
      }))}
    />
  </div>
);

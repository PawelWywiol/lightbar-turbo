import { LIGHTS_FRAME_SIZES } from 'config';

import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';

import type { EditorProps } from '../../editor.types';

export const LightsSchemeTools = ({ scheme, setScheme }: EditorProps) => (
  <div className="flex justify-between content-center px-4">
    <div></div>
    <div className='flex'>
      <DropDownMenu
        options={LIGHTS_FRAME_SIZES.map((size) => ({
          label: size.label,
          onClick: () => setScheme({ ...scheme, size }),
        }))}
      />
    </div>
  </div>
);

import { DEVICE_SIZES } from 'config/devices';

import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';

import type { EditorProps } from '../../editor.types';

export const LightsSchemeTools = ({
  device,
  setDevice,
}: Pick<EditorProps, 'device' | 'setDevice'>) => (
  <div className="flex">
    <DropDownMenu
      options={DEVICE_SIZES.map((size) => ({
        label: size.label,
        onClick: () => setDevice({ ...device, size }),
      }))}
    />
  </div>
);

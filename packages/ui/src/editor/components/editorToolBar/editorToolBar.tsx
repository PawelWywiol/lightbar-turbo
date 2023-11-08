import { Flex } from '@radix-ui/themes';
import { LIGHTS_FRAME_SIZES } from 'config';

import { Select } from '../../../select/select';

import type { EditorProps } from '../../editor.types';

export const EditorToolBar = ({ scheme, setScheme }: EditorProps) => (
  <Flex justify="between" align="center" px={'4'}>
    <div></div>
    <div>
      <Select
        options={LIGHTS_FRAME_SIZES.map((size) => ({
          value: `${size.value}`,
          label: size.label,
        }))}
        value={`${scheme.size.value}`}
        onChange={(sizeValue) => {
          const size = LIGHTS_FRAME_SIZES.find(
            (sizeOption) => sizeOption.value === Number.parseInt(sizeValue, 10),
          );

          size && setScheme({ ...scheme, size });
        }}
      />
    </div>
  </Flex>
);

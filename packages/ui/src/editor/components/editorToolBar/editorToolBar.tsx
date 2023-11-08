import { Flex } from '@radix-ui/themes';

import { Select } from '../../../select/select';

import type { EditorToolBarProps } from './editorToolBar.types';

export const EditorToolBar = ({ sizes, scheme, onChange }: EditorToolBarProps) => (
  <Flex justify="between" align="center" px={'4'}>
    <div></div>
    <div>
      <Select
        options={sizes.map((size) => ({
          value: `${size.value}`,
          label: size.label,
        }))}
        value={`${scheme.size}`}
        onChange={(sizeValue) => {
          const size = sizes.find(
            (sizeOption) => sizeOption.value === Number.parseInt(sizeValue, 10),
          )?.value;

          size && onChange({ ...scheme, size });
        }}
      />
    </div>
  </Flex>
);

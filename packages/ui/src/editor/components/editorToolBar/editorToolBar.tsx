import { Flex } from '@radix-ui/themes';

import { Select } from '../../../select/select';

import type { EditorToolBarProps } from './editorToolBar.types';

export const EditorToolBar = ({ sizes }: EditorToolBarProps) => (
  <Flex justify="between" align="center" px={'4'}>
    <div></div>
    <div>
      <Select options={sizes} defaultValue={`${sizes[0]}`} />
    </div>
  </Flex>
);

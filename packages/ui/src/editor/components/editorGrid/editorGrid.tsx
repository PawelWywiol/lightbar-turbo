import { AspectRatio, Flex, Grid } from '@radix-ui/themes';

import { editorGridItem } from './editorGrid.styles';

import type { EditorProps } from '../../editor.types';

export const EditorGrid = ({ scheme }: EditorProps) => (
  <Grid columns={`${scheme.size.grid.columns}` as never} gap="1" width="auto" p={'4'}>
    {Array.from({ length: scheme.size.value }).map((_, index) => (
      <AspectRatio key={index} ratio={1}>
        <Flex
          className={editorGridItem()}
          width={'100%'}
          height={'100%'}
          justify={'center'}
          align={'center'}
        />
      </AspectRatio>
    ))}
  </Grid>
);

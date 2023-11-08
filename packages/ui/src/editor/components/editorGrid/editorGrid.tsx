import { AspectRatio, Box, Grid } from '@radix-ui/themes';

import type { EditorProps } from '../../editor.types';

export const EditorGrid = ({ scheme }: EditorProps) => (
  <Grid gap="1" width="auto" columns={`${scheme.size.grid.columns}` as never}>
    {Array.from({ length: scheme.size.value }).map((_, index) => (
      <AspectRatio key={index} ratio={1}>
        <Box width={'100%'} height={'100%'}>
          {index}
        </Box>
      </AspectRatio>
    ))}
  </Grid>
);

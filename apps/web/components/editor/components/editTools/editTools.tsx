import { Button } from 'ui/button';
import { DropDownMenu } from 'ui/dropdownMenu';

import { EDITOR_TOOLS_LIST } from '../../editor.config';

import { ColorActions } from './components/colorActions';
import { MoveActions } from './components/moveActions';

import type { EditToolsProps } from './editTools.types';

export const EditTools = ({
  tool,
  setTool,
  colorIndex,
  setColorIndex,
  colors,
  shiftLightsFrameColorPixel,
}: EditToolsProps) => {
  const selectedTool = EDITOR_TOOLS_LIST.find((editorTool) => editorTool.value === tool);

  return (
    <div className="flex gap-2">
      <DropDownMenu
        trigger={
          <Button className="px-2 aspect-square justify-center align-middle rounded">
            {selectedTool?.icon ?? tool}
          </Button>
        }
        options={EDITOR_TOOLS_LIST.map((editorTool) => ({
          label: editorTool.label,
          onClick: () => setTool(editorTool.value),
        }))}
      />
      {tool === 'pencil' && (
        <ColorActions colors={colors} colorIndex={colorIndex} setColorIndex={setColorIndex} />
      )}
      {tool === 'move' && <MoveActions shiftLightsFrameColorPixel={shiftLightsFrameColorPixel} />}
    </div>
  );
};

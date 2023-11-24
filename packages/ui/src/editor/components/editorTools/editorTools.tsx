import { Button } from '../../../button/button';
import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';
import { EDITOR_TOOLS_LIST } from '../../editor.config';

import type { EditorToolsProps } from './editorTools.types';
import { ColorActions } from './components/colorActions';

import { MoveActions } from './components/moveActions';

export const EditorTools = ({
  tool,
  setTool,
  colorIndex,
  setColorIndex,
  colors,
  shiftLightsFrameColorPixel,
}: EditorToolsProps) => {
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

import Compact from '@uiw/react-color-compact';

import { Button } from '../../../button/button';
import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';
import { Popover } from '../../../popover/popover';
import { EDITOR_TOOLS_LIST, EditorToolType } from '../../editor.config';

export const EditorTools = ({
  tool,
  setTool,
  color,
  colors,
}: {
  tool: EditorToolType;
  setTool: (tool: EditorToolType) => void;
  color: string;
  colors: string[];
}) => {
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
      <Popover
        trigger={
          <Button className="rounded-full aspect-square px-0 overflow-hidden">
            <span className="rounded-full w-full h-full" style={{ backgroundColor: 'red' }} />
          </Button>
        }
      >
        <Compact color={color} colors={colors} />
      </Popover>
    </div>
  );
};

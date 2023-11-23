import { Button } from '../../../button/button';
import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';
import { Dialog } from '../../../dialog/dialog';
import { EDITOR_TOOLS_LIST, EditorToolType } from '../../editor.config';
import { DEFAULT_COLOR } from 'config';

export const EditorTools = ({
  tool,
  setTool,
  colorIndex,
  setColorIndex,
  colors,
}: {
  tool: EditorToolType;
  setTool: (tool: EditorToolType) => void;
  colorIndex: number;
  setColorIndex: (colorIndex: number) => void;
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
      <Dialog
        className="flex justify-center align-middle max-w-[fit-content]"
        trigger={
          <Button className="rounded aspect-square px-0 overflow-hidden">
            <span
              className="rounded w-5 aspect-square"
              style={{ backgroundColor: colors[colorIndex] ?? DEFAULT_COLOR }}
            />
          </Button>
        }
      >
        <div className="grid grid-cols-8 gap-1">
          {colors.map((color, index) => (
            <span
              key={index}
              className="w-8 aspect-square rounded cursor-pointer flex justify-center items-center"
              onClick={() => setColorIndex(index)}
              style={{ background: color }}
            >
              {index === colorIndex && (
                <span className="flex items-center justify-center w-4 aspect-square rounded-full bg-[white] shadow-md" />
              )}
            </span>
          ))}
        </div>
      </Dialog>
    </div>
  );
};

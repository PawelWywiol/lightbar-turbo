import Compact from '@uiw/react-color-compact';

import { Button } from '../../../button/button';
import { DropDownMenu } from '../../../dropdownMenu/dropdownMenu';
import { DotIcon } from '../../../icons/dotIcon';
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
              className="rounded w-6 aspect-square"
              style={{ backgroundColor: colors[colorIndex] ?? DEFAULT_COLOR }}
            />
          </Button>
        }
      >
        <Compact
          color={colors[colorIndex] ?? DEFAULT_COLOR}
          colors={colors}
          rectRender={(props) => {
            console.log(props);
            return (
              <span
                key={props.key}
                className="w-7 aspect-square m-[2px] rounded cursor-pointer flex justify-center align-middle outline-none"
                onClick={() => setColorIndex(parseInt(`${props.key}`, 10))}
                style={{ background: props.color }}
              >
                {props.checked && <DotIcon className="w-full h-full" />}
              </span>
            );
          }}
          style={{ background: 'transparent', width: '265px' }}
        />
      </Dialog>
    </div>
  );
};

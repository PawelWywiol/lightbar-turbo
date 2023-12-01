import { LIGHTS_SCHEME_NAME_MAX_LENGTH } from 'config';
import { Button } from '../../../button/button';
import { DoubleArrowLeft, DoubleArrowRight } from '../../../icons';
import { TextField } from '../../../textField/textField';
import type { StateToolsProps } from './stateTools.types';

export const StateTools = ({
  scheme,
  handleUpdate,
  undoAvailable,
  handleUndo,
  redoAvailable,
  handleRedo,
}: StateToolsProps) => (
  <div className="flex justify-center content-center px-4 gap-4">
    <div className="flex justify-center content-center gap-2">
      <Button disabled={!undoAvailable} onClick={handleUndo}>
        <DoubleArrowLeft />
      </Button>
      <Button disabled={!redoAvailable} onClick={handleRedo}>
        <DoubleArrowRight />
      </Button>
    </div>
    <div className="flex flex-1 justify-stretch">
      <TextField
        className="w-full"
        value={scheme.name}
        onChange={(name) => {
          handleUpdate({
            ...scheme,
            name: name.replace(/(<([^>]+)>)/gi, ''),
          });
        }}
        maxLength={LIGHTS_SCHEME_NAME_MAX_LENGTH}
      />
    </div>
    <div className="flex">
      <Button>Save</Button>
    </div>
  </div>
);

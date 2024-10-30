import sanitizeHtml from 'sanitize-html';
import { UndoDotIcon, RedoDotIcon } from 'lucide-react';
import { LIGHTS_SCHEME_NAME_MAX_LENGTH } from 'devices/lights.config';
import { Button } from 'ui/button';
import { Input } from 'ui/input';

import { useEditor } from '../editor.provider';

export const LightsSchemeStateTools = () => {
  const {
    lightsScheme,
    handleUndo,
    undoAvailable,
    handleRedo,
    redoAvailable,
    handleUpdate,
    handleSave,
  } = useEditor();

  return (
    <div className="flex justify-center content-center gap-4">
      <div className="flex justify-center content-center gap-2">
        <Button disabled={!undoAvailable} onClick={handleUndo}>
          <UndoDotIcon />
        </Button>
        <Button disabled={!redoAvailable} onClick={handleRedo}>
          <RedoDotIcon />
        </Button>
      </div>
      <div className="flex flex-1 justify-stretch">
        <Input
          className="w-full"
          value={lightsScheme.scheme.name}
          onChange={(event) => {
            const name = sanitizeHtml(event.target.value, {
              allowedTags: [],
              allowedAttributes: {},
            });
            handleUpdate({
              ...lightsScheme.scheme,
              name,
            });
          }}
          maxLength={LIGHTS_SCHEME_NAME_MAX_LENGTH}
        />
      </div>
      <div className="flex">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

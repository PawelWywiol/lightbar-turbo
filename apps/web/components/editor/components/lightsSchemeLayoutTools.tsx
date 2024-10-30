import { SelectWrapper } from 'ui/select';
import { DEFAULT_LIGHTS_LAYOUT_OPTIONS } from 'devices/lights.config';

import { useEditor } from '../editor.provider';

export const LightsSchemeLayoutTools = () => {
  const { lightsLayout, setLightsLayout } = useEditor();

  return (
    <div className="flex">
      <SelectWrapper
        options={DEFAULT_LIGHTS_LAYOUT_OPTIONS.map(({ value, label }) => ({
          value,
          label,
        }))}
        value={lightsLayout.value}
        onChange={(selected) => {
          const option = DEFAULT_LIGHTS_LAYOUT_OPTIONS.find(({ value }) => selected === `${value}`);

          if (option) {
            setLightsLayout(option);
          }
        }}
      />
    </div>
  );
};

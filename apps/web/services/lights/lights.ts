import { getStorageData, setStorageData } from 'utils';
import { LightsSchemeDataArrayValidationSchema, type LightsSchemeData } from 'config';

const LIGHTS_SCHEME_DATA_ARRAY_KEY = 'lightsSchemeDataArray';

export const postLightsScheme = (data: LightsSchemeData) => {
  const lightsList = getStorageData(
    LIGHTS_SCHEME_DATA_ARRAY_KEY,
    LightsSchemeDataArrayValidationSchema,
    [],
  );

  const newLightsList = lightsList.filter((item) => item.uid !== data.uid);

  newLightsList.push(data);

  setStorageData(LIGHTS_SCHEME_DATA_ARRAY_KEY, newLightsList);
};

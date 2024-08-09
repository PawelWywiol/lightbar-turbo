import { getStorageData, setStorageData } from 'utils/storage';
import { LightsSchemeDataArrayValidationSchema } from 'devices/lights.schema';

import type { LightsSchemeData } from 'devices/lights.types';

const LIGHTS_SCHEME_DATA_ARRAY_KEY = 'lightsSchemeDataArray';

export const getLightsSchemeData = (schemeId: string) => {
  const lightsList = getStorageData(
    LIGHTS_SCHEME_DATA_ARRAY_KEY,
    LightsSchemeDataArrayValidationSchema,
    [],
  );

  return lightsList.find((item) => item.uid === schemeId);
};

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

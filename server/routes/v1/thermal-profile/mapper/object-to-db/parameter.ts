import {
  PeakTempParameterObject,
  PreheatTimeParameterObject,
  RampTimeRateParameterObject,
  ReflowTimeParameterObject,
} from "../../types/object";
import hashObject from "hash-object";
export const makeObjToDBParameter = (
  obj:
    | PeakTempParameterObject
    | PreheatTimeParameterObject
    | ReflowTimeParameterObject
    | RampTimeRateParameterObject,
) => {
  const id = hashObject({
    parameter: obj.parameter,
    profileName: obj.profileName,
    profileTag: obj.profileTag,
  });
  return {
    _id: id,
    ...obj,
  };
};

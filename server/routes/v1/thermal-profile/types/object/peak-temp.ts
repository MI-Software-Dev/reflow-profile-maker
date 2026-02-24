import { Static, t } from "elysia";

export const peakTempParameterObject = t.Object({
  profileName: t.String(),
  profileTag: t.String(),
  parameter: t.String(),
  maxLowTemp: t.Number(),
  maxHighTemp: t.Number(),
});

export type PeakTempParameterObject = Static<typeof peakTempParameterObject>;

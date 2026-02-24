import { Static, t } from "elysia";

export const rampTimeRateParameterObject = t.Object({
  profileName: t.String(),
  profileTag: t.String(),
  parameter: t.String(),
  upFrom: t.Number(),
  upTo: t.Number(),
  upMinDuration: t.Number(),
  downFrom: t.Number(),
  downTo: t.Number(),
  downMinDuration: t.Number(),
});

export type RampTimeRateParameterObject = Static<
  typeof rampTimeRateParameterObject
>;

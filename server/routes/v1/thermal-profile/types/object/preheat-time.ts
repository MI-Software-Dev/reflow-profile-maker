import { Static, t } from "elysia";

export const preheatTimeParameterObject = t.Object({
  profileName: t.String(),
  profileTag: t.String(),
  parameter: t.String(),
  minTemp: t.Number(),
  maxTemp: t.Number(),
  minTime: t.Number(),
  maxTime: t.Number(),
});

export type PreheatTimeParameterObject = Static<
  typeof preheatTimeParameterObject
>;

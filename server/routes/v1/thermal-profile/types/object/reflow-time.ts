import { Static, t } from "elysia";

export const reflowTimeParameterObject = t.Object({
  profileName: t.String(),
  profileTag: t.String(),
  parameter: t.String(),
  minTemp: t.Number(),
  minTime: t.Number(),
  maxTime: t.Number(),
});

export type ReflowTimeParameterObject = Static<
  typeof reflowTimeParameterObject
>;

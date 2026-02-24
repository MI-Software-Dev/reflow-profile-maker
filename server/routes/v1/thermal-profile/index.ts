import Elysia, { t } from "elysia";
import {
  peakTempParameterObject,
  preheatTimeParameterObject,
  rampTimeRateParameterObject,
  reflowTimeParameterObject,
} from "./types/object";
import { FetchAllParameterUseCase, UpsertParameterUseCase } from "./use-cases";

export const ThermalProfileRoute = new Elysia({
  prefix: "/thermal-profile",
})
  .get("/parameter", async () => {
    return FetchAllParameterUseCase();
  })
  .post(
    "/parameter",
    async ({ body }) => {
      return await UpsertParameterUseCase(body);
    },
    {
      body: t.Union([
        peakTempParameterObject,
        preheatTimeParameterObject,
        rampTimeRateParameterObject,
        reflowTimeParameterObject,
      ]),
    },
  );

import Elysia from "elysia";
import { SettingRoute } from "./setting";
import { KitReflowRoute } from "./kit-reflow";

export const V1Route = new Elysia({ prefix: "/v1" })
  .use(SettingRoute)
  .use(KitReflowRoute);

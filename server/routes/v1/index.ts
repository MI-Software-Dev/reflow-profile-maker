import Elysia from "elysia";
import { SettingRoute } from "./setting";

export const V1Route = new Elysia({ prefix: "/v1" }).use(SettingRoute);

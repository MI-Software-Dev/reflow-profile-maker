import Elysia, { t } from "elysia";
import { staticClient } from "../../../utils";
import { UploadResultUseCase } from "./use-cases";

export const SettingRoute = new Elysia({ prefix: "/setting" })
  .get("/line", async () => {
    return staticClient.readStatic("line");
  })
  .get("/group", async () => {
    return staticClient.readStatic("group");
  })
  .get("/n2", async () => {
    return staticClient.readStatic("n2");
  })
  .get("/nas", async () => {
    return staticClient.readStatic("nas");
  })
  .get("/gateway", async () => {
    return staticClient.readStatic("gateway");
  })
  .get("/db", async () => {
    return staticClient.readStatic("db");
  })
  .post(
    "/line",
    async ({ body }) => {
      const { line } = body;
      return staticClient.updateStatic("line", line);
    },
    {
      body: t.Object({
        line: t.Array(t.String()),
      }),
    },
  )
  .post(
    "/group",
    async ({ body }) => {
      const { group } = body;
      return staticClient.updateStatic("group", group);
    },
    {
      body: t.Object({
        group: t.Array(t.String()),
      }),
    },
  )
  .post(
    "/n2",
    async ({ body }) => {
      const { n2 } = body;
      return staticClient.updateStatic("n2", n2);
    },
    {
      body: t.Object({
        n2: t.Array(t.String()),
      }),
    },
  )
  .post(
    "/nas",
    async ({ body }) => {
      return staticClient.updateStatic("nas", body);
    },
    {
      body: t.Object({
        ip: t.String(),
        username: t.String(),
        password: t.String(),
        path: t.String(),
      }),
    },
  )
  .post(
    "/gateway",
    async ({ body }) => {
      return staticClient.updateStatic("gateway", body);
    },
    {
      body: t.Object({
        url: t.String(),
      }),
    },
  )
  .post(
    "/db",
    async ({ body }) => {
      return staticClient.updateStatic("db", body);
    },
    {
      body: t.Object({
        host: t.String(),
        username: t.String(),
        password: t.String(),
        port: t.Number(),
      }),
    },
  )
  .post(
    "/upload-result",
    async ({ body, query }) => {
      const { file } = body;
      const { isNG } = query;
      if (!file) {
        return { error: "No file uploaded" };
      }
      return UploadResultUseCase(file, isNG);
    },
    {
      query: t.Object({
        isNG: t.Boolean(),
      }),
      body: t.Object({
        file: t.File(),
      }),
    },
  );

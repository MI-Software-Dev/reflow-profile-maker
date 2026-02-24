import { gatewayConfig } from "@/server/static";
import Elysia, { t } from "elysia";

export const KitReflowRoute = new Elysia({ prefix: "/kit-reflow" })
  .get("/", async () => {
    const res = await fetch(gatewayConfig.url, {
      method: "GET",
    });
    return new Response(res.body, {
      status: res.status,
      headers: res.headers,
    });
  })
  .get(
    "/:kitName",
    async ({ params }) => {
      const { kitName } = params;
      const res = await fetch([gatewayConfig.url, kitName].join("/"), {
        method: "GET",
      });
      return new Response(res.body, {
        status: res.status,
        headers: res.headers,
      });
    },
    {
      params: t.Object({
        kitName: t.String(),
      }),
    },
  );

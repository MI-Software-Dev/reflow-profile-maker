import Elysia from "elysia";

export const KitReflowRoute = new Elysia({ prefix: "/kit-reflow" }).get(
  "/",
  async () => {
    return "Hello";
  },
);

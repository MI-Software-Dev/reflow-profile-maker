import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { V1Route } from "@/server/routes/v1";

const app = new Elysia({ prefix: "/api" })
  //   .use(
  //     logger({
  //       level: "info",
  //       transport: {
  //         target: "pino-pretty",
  //         options: {
  //           colorize: true,
  //           translateTime: "HH:MM:ss",
  //           ignore: "pid,hostname",
  //         },
  //       },
  //     }),
  //   )
  .use(
    swagger({
      path: "/openapi",
      documentation: {
        info: {
          title: "Reflow Profile Maker API",
          version: "2.14.19",
        },
        servers: [
          {
            url: "/reflow-profile-maker",
          },
        ],
      },
    }),
  )
  .get("/", () => {
    function formatDateTime(date: Date): string {
      const pad = (n: number) => n.toString().padStart(2, "0");

      const year = date.getFullYear();
      const month = pad(date.getMonth() + 1); // 0-based
      const day = pad(date.getDate());

      const hours = pad(date.getHours());
      const minutes = pad(date.getMinutes());
      const seconds = pad(date.getSeconds());

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const now = new Date();
    return formatDateTime(now);
  })
  .use(V1Route);
// 2. Export handler ให้ Next.js รู้จัก
export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;

// 3. (Optional) Export Type เพื่อใช้กับ Eden ในฝั่ง Frontend
export type App = typeof app;

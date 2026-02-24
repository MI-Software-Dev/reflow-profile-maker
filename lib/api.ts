import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@/app/api/[[...slug]]/route";

// Create the Eden client with proper typing and environment-aware URL
export const api = edenTreaty<App>(
  "http://localhost:3000/reflow-profile-maker",
);

// Export the client for use throughout the application
export default api;

// Type exports for convenience
export type ApiClient = typeof api;
export type ApiType = App;

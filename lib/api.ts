import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@/app/api/[[...slug]]/route";

// Get the base URL based on environment
const getBaseUrl = () => {
  // In browser, use relative URL
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  // In server-side rendering, use localhost
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }

  // In production, use the deployment URL
  return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
};

// Create the Eden client with proper typing and environment-aware URL
export const api = edenTreaty<App>(getBaseUrl());

// Export the client for use throughout the application
export default api;

// Type exports for convenience
export type ApiClient = typeof api;
export type ApiType = App;

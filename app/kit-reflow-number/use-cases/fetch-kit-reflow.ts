import { failure, success, Result } from "@/client/helper";
import api from "@/lib/api";
import { KitReflowResponse } from "../schema";

export const FetchKitReflowUseCase = async (): Promise<
  Result<KitReflowResponse>
> => {
  try {
    const res = await api.api.v1["kit-reflow"].get();
    return success(res.data as KitReflowResponse);
  } catch (error: unknown) {
    return failure(
      error instanceof Error ? error.message : "Unexpected error occurred",
    );
  }
};

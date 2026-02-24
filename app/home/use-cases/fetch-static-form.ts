import { failure, success } from "@/client/helper";
import api from "@/lib/api";

export const FetchStaticFormUseCase = async () => {
  try {
    const lineRes = await api.api.v1.setting.line.get();
    const groupRes = await api.api.v1.setting.group.get();
    const n2Res = await api.api.v1.setting.n2.get();
    const line = lineRes.data as { line: string[] };
    const group = groupRes.data as { group: string[] };
    const n2 = n2Res.data as { n2: string[] };
    return success({
      line: line.line,
      group: group.group,
      n2: n2.n2,
    });
  } catch (error: unknown) {
    return failure(
      error instanceof Error ? error.message : "Unexpected error occurred",
    );
  }
};

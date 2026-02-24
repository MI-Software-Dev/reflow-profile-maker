import { staticClient } from "@/server/utils";
import {
  PeakTempParameterObject,
  PreheatTimeParameterObject,
  RampTimeRateParameterObject,
  ReflowTimeParameterObject,
} from "../types/object";
import { dbConfig } from "@/server/static";
import { withCouchDB } from "@/server/wrapper";
import { failure, Result, success } from "@/server/helper";
import nano from "nano";
import { makeObjToDBParameter } from "../mapper/object-to-db";

export const UpsertParameterUseCase = async (
  obj:
    | PeakTempParameterObject
    | PreheatTimeParameterObject
    | ReflowTimeParameterObject
    | RampTimeRateParameterObject,
) => {
  const config: typeof dbConfig = staticClient.readStatic("db");
  const data = makeObjToDBParameter(obj);

  return await withCouchDB<Result<nano.DocumentBulkResponse[]>>(
    config,
    "thermal_db",
    async (db) => {
      const upsertedDoc: Record<string, string | number> = { ...data };

      try {
        const existing = await db.get(data._id);
        upsertedDoc._rev = existing._rev;
      } catch (e: unknown) {
        // If error is NOT_FOUND → it's fine (new doc)
        if (
          typeof e === "object" &&
          e !== null &&
          "statusCode" in e &&
          e.statusCode !== 404
        ) {
          return failure(e instanceof Error ? e.message : `${e}`);
        }
      }

      try {
        const res = await db.bulk({
          docs: [upsertedDoc],
        });

        return success(res);
      } catch (e: unknown) {
        return failure(e instanceof Error ? e.message : `${e}`);
      }
    },
  );
};

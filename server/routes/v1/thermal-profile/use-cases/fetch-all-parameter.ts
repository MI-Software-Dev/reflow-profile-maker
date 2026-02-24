import { dbConfig } from "@/server/static";
import { staticClient } from "@/server/utils";
import { withCouchDB } from "@/server/wrapper";
import { makeDBToObjParameter } from "../mapper/db-to-object";

export const FetchAllParameterUseCase = async () => {
  const config: typeof dbConfig = staticClient.readStatic("db");
  return await withCouchDB(config, "thermal_db", async (db) => {
    return (await db.list({ include_docs: true })).rows.map((row) => {
      if (row.doc) {
        return makeDBToObjParameter(row.doc);
      }
    });
  });
};

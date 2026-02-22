import { Readable } from "stream";
import { withFTP } from "../../../../wrapper";
import { staticClient } from "../../../../utils";
import { nasConfigJson } from "@/server/static";
export const UploadResultUseCase = async (file: File, isNg: boolean) => {
  const nasConfig: typeof nasConfigJson = staticClient.readStatic("nas");
  const arrayBuffer = await file.arrayBuffer();
  const stream = Readable.from(Buffer.from(arrayBuffer));
  const fileName = file.name;
  return await withFTP(
    {
      host: nasConfig.host,
      password: nasConfig.password,
      user: nasConfig.username,
    },
    async (client) => {
      const path = [nasConfig.path, isNg && "NG"].filter(Boolean).join("/");
      await client.ensureDir(path);
      await client.uploadFrom(stream, [path, fileName].join("/"));
      return await client.list();
    },
  );
};

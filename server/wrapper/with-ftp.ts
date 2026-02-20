import * as ftp from "basic-ftp";
export const withFTP = async <T>(
  config: {
    host: string;
    user: string;
    password: string;
  },
  fn: (client: ftp.Client) => Promise<T>,
): Promise<T> => {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: config.host,
      user: config.user,
      password: config.password,
      secure: false,
    });
    return await fn(client);
  } catch (error) {
    throw error;
  } finally {
    client.close();
  }
};

import nano from "nano";

export const withCouchDB = async <T>(
  config: {
    username: string;
    password: string;
    host: string;
    port: number;
  },
  dbName: string,
  fn: (db: nano.DocumentScope<T>) => Promise<T>,
): Promise<T> => {
  const url = `http://${config.username}:${config.password}@${config.host}:${config.port}`;
  const client = nano({ url });

  try {
    // Check if database exists
    await client.db.get(dbName);
  } catch (error) {
    if (error && typeof error === "object" && "statusCode" in error) {
      if (error.statusCode === 404) {
        // Database does not exist → create it
        await client.db.create(dbName);
      } else {
        // Any other error should bubble up
        throw error;
      }
    } else {
      throw error;
    }
  }
  const db = client.use<T>(dbName);

  // Database now guaranteed to exist
  return fn(db);
};

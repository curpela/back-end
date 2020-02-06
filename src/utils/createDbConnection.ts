import { createConnection, getConnectionOptions } from "typeorm";

export const createDbConnection = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

  return process.env.NODE_ENV === "production"
    ? createConnection({
        ...connectionOptions,
        url: process.env.DATABASE_URL,
        entities: [__dirname + "/entity/*.ts"],
        name: "default"
      } as any)
    : createConnection({
        ...connectionOptions,
        ssl: {
          rejectUnauthorized: false
        },
        url: process.env.DATABASE_URL,
        name: "default"
      } as any);
};

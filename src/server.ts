import "reflect-metadata";
import { createDbConnection } from "./utils/createDbConnection";
import { ApolloServer } from "apollo-server";
import typeDefs from "./schema";
import resolvers from "./resolvers";

(async () => {
  try {
    // Create db connection
    await createDbConnection();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context(request) {
        return {
          req: request
        };
      }
    });

    server
      .listen({ port: process.env.PORT || 4000 })
      .then(({ url }) => console.log(`API -> ${url}`));
  } catch (error) {
    console.log(error);
  }
})();

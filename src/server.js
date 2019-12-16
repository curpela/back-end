const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");

const server = new ApolloServer({
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`(☞ ͡° ͜ʖ ͡°)☞ Server ready at ${url}`);
});

const { Photon } = require("@prisma/photon");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Create db connection
const photon = new Photon();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context(request) {
    return {
      request,
      photon
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`(☞ ͡° ͜ʖ ͡°)☞ Server ready at ${url}`);
});

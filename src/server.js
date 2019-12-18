const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { Photon } = require("@prisma/photon");

// Create db connection
const photon = new Photon();

const server = new ApolloServer({
  typeDefs,
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

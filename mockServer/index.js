/* eslint-disable @typescript-eslint/no-require-imports */
const { ApolloServer } = require("apollo-server");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadSchemaSync } = require("@graphql-tools/load");

// Load schema from the file
const schema = loadSchemaSync("./mockServer/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const mocks = {};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  schema,
  mocks,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

/* eslint-disable @typescript-eslint/no-require-imports */
const { ApolloServer } = require("apollo-server");
const { GraphQLFileLoader } = require("@graphql-tools/graphql-file-loader");
const { loadSchemaSync } = require("@graphql-tools/load");
const { faker } = require("@faker-js/faker");

// Load schema from the file
const schema = loadSchemaSync("./mockServer/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

const mocks = {
  Query: () => ({
    seasonPilotsRanking: () => [...new Array(5)],
  }),
  Driver: () => ({
    name: () => `${faker.name.firstName()} ${faker.name.lastName()}`,
    code: () => faker.random.alpha({ count: 3, casing: "upper" }),
    nationality: () => faker.address.country(),
    permanentNumber: () => faker.datatype.number({ min: 0, max: 99 }),
  }),
  DriverStanding: () => ({
    constructors: () => [{ name: faker.vehicle.manufacturer() }],
    points: () => faker.datatype.number({ min: 0, max: 200 }),
    wins: () => faker.datatype.number({ min: 0, max: 10 }),
  }),
};

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

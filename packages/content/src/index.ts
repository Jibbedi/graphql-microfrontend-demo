import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const hotels = {
  1: {
    name: "Cesar's Palace",
    rating: 5,
    latitude: 10.111,
    longitude: 10.111
  },
  2: {
    name: "Venetian",
    rating: 5,
    latitude: 10.111,
    longitude: 10.111
  }
};

const typeDefs = gql`
  extend type Hotel @key(fields: "id") {
    id: ID! @external
    name: String!
    rating: Int!
    latitude: Float!
    longitude: Float!
  }
`;

const resolvers = {
  Hotel: {
    __resolveReference: reference => {
      return hotels[reference.id];
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const hotels = [
  {
    id: "1",
    price: 199.0
  },
  {
    id: "2",
    price: 299.0
  }
];

const typeDefs = gql`
  type Hotel @key(fields: "id") {
    id: ID!
    price: Float!
  }
  type Query {
    getSearchResults: [Hotel]
  }
`;

const resolvers = {
  Query: {
    getSearchResults: () => hotels
  },
  Hotel: {
    __resolveReference: reference => {
      return hotels.find(hotel => hotel.id === reference.id);
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

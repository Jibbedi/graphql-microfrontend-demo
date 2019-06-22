import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const hotels = [
  {
    id: "1",
    name: "Cesar's Palace",
    rating: 5
  },
  {
    id: "2",
    name: "Venetian",
    rating: 5
  }
];

const typeDefs = gql`
  type Hotel {
    id: ID!
    name: String!
    rating: Int!
  }
  type Query {
    hotels: [Hotel]
  }
`;

const resolvers = {
  Query: {
    hotels: () => hotels
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

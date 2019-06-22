import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";

const customer = [
  {
    id: "1",
    firstName: "Gates",
    lastName: "Bill"
  },
  {
    id: "2",
    firstName: "Jeff",
    lastName: "Bezos"
  }
];

const typeDefs = gql`
  type Customer {
    id: ID!
    firstName: String
    lastName: String
  }

  type Query {
    customers: [Customer]
  }
`;

const resolvers = {
  Query: {
    customers: () => customer
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

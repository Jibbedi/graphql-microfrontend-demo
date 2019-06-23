import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const hotels = [
  {
    id: "1",
    price: 199.0,
    prominent: true
  },
  {
    id: "2",
    price: 299.0
  },
  {
    id: "3",
    price: 99.0
  }
];

const typeDefs = gql`
  type ProminentResult {
    hotel: Hotel!
  }

  type MainResults {
    hotels: [Hotel!]!
  }

  union SearchResult = ProminentResult | MainResults

  type Hotel @key(fields: "id") {
    id: ID!
    price: Float!
  }
  type Query {
    getSearchResults: [SearchResult]
  }
`;

const resolvers = {
  SearchResult: {
    __resolveType: obj => {
      return obj.hotel ? "ProminentResult" : "MainResults";
    }
  },
  Query: {
    getSearchResults: () => {
      const mainResults = hotels.filter(hotel => !hotel.prominent);
      const prominentResult = hotels.find(hotel => hotel.prominent);

      return [{ hotel: prominentResult }, { hotels: mainResults }];
    }
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

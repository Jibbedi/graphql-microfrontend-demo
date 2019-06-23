import { ApolloServer, gql } from "apollo-server";
import { buildFederatedSchema } from "@apollo/federation";

const hotels = {
  1: {
    name: "Cesar's Palace",
    rating: 5,
    latitude: 10.111,
    longitude: 10.111,
    description:
      "Donec sodales ex eu elementum efficitur. Aliquam finibus augue sit amet erat auctor lacinia. Morbi rhoncus urna a egestas congue. Donec a sapien ac nibh molestie convallis a vel velit. Nullam vel fermentum massa. Nulla vel nulla quis lectus pretium volutpat eget ut sapien. Nunc libero diam, iaculis quis faucibus et, gravida quis ante. Ut commodo vestibulum molestie.",
    thumbnailImageUrl:
      "https://images.unsplash.com/photo-1444201983204-c43cbd584d93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    prominentImageUrl:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  },
  2: {
    name: "Venetian",
    rating: 5,
    latitude: 10.111,
    longitude: 10.111,
    description:
      "Donec sodales ex eu elementum efficitur. Aliquam finibus augue sit amet erat auctor lacinia. Morbi rhoncus urna a egestas congue. Donec a sapien ac nibh molestie convallis a vel velit. Nullam vel fermentum massa. Nulla vel nulla quis lectus pretium volutpat eget ut sapien. Nunc libero diam, iaculis quis faucibus et, gravida quis ante. Ut commodo vestibulum molestie.",
    thumbnailImageUrl:
      "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    prominentImageUrl:
      "https://images.unsplash.com/photo-1553884870-c10d738c389b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
  },
  3: {
    name: "Excalibur",
    rating: 4,
    latitude: 10.111,
    longitude: 10.111,
    description:
      "Donec sodales ex eu elementum efficitur. Aliquam finibus augue sit amet erat auctor lacinia. Morbi rhoncus urna a egestas congue. Donec a sapien ac nibh molestie convallis a vel velit. Nullam vel fermentum massa. Nulla vel nulla quis lectus pretium volutpat eget ut sapien. Nunc libero diam, iaculis quis faucibus et, gravida quis ante. Ut commodo vestibulum molestie.",
    thumbnailImageUrl:
      "https://images.unsplash.com/photo-1445991842772-097fea258e7b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    prominentImageUrl:
      "https://images.unsplash.com/photo-1553884870-c10d738c389b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1949&q=80"
  }
};

const typeDefs = gql`
  extend type Hotel @key(fields: "id") {
    id: ID! @external
    name: String!
    description: String!
    rating: Int!
    latitude: Float!
    longitude: Float!
    prominentImageUrl: String!
    thumbnailImageUrl: String!
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

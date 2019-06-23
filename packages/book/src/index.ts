import { buildFederatedSchema } from "@apollo/federation";
import { ApolloServer, gql } from "apollo-server";

const shoppingCarts = {};

const createRandomId = () => Math.random().toString(36);

const createShoppingCart = () => ({
  id: createRandomId(),
  hotels: []
});

const typeDefs = gql`
  extend type Hotel @key(fields: "id") {
    id: ID! @external
  }

  type ShoppingCart {
    id: ID!
    hotels: [Hotel!]!
  }

  type Query {
    getShoppingCart(shoppingCartId: ID!): ShoppingCart
  }

  type Mutation {
    addToShoppingCart(shoppingCartId: ID, hotelId: ID!): ShoppingCart
  }
`;

const resolvers = {
  Query: {
    getShoppingCart: (_: never, args: any) => {
      return shoppingCarts[args.shoppingCartId];
    }
  },
  Mutation: {
    addToShoppingCart: (_: never, args: any) => {
      if (args.shoppingCartId && shoppingCarts[args.shoppingCartId]) {
        shoppingCarts[args.shoppingCartId].hotels.push({ id: args.hotelId });
        return shoppingCarts[args.shoppingCartId];
      }

      const newShoppingCart = createShoppingCart();
      newShoppingCart.hotels.push({ id: args.hotelId });
      shoppingCarts[newShoppingCart.id] = newShoppingCart;
      return newShoppingCart;
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

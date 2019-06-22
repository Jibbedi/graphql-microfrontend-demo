import { ApolloServer } from "apollo-server";
import { ApolloGateway } from "@apollo/gateway";

const gateway = new ApolloGateway({
  serviceList: [
    { name: "content", url: "http://content:4000" },
    { name: "customer", url: "http://customer:4000" }
  ]
});

(async () => {
  const { schema, executor } = await gateway.load();
  const server = new ApolloServer({ schema, executor });
  server.listen();
})();

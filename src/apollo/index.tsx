require("dotenv").config();

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";
// import { hasuraAdminSecret, hasuraGraphqlUri, hasuraWsUri } from "../config";

// HTTP link
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URI,
  headers: {
    "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
  },
  fetchOptions: {
    mode: "cors",
    credentials: "include",
  },
});

// WebSocket link
const wsLink = new WebSocketLink({
  uri: process.env.NEXT_PUBLIC_HASURA_WS_URI!,
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
      },
    },
  },
});

// Split link based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Apollo Client instance
const client = new ApolloClient({
  link: splitLink, // Use the split link
  cache: new InMemoryCache(),
});

export default client;

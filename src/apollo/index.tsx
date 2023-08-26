import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws"; // Import WebSocketLink

// HTTP link
const httpLink = createHttpLink({
  uri: "https://mutual-flea-53.hasura.app/v1/graphql",
  headers: {
    "x-hasura-admin-secret":
      "35gEAdwe2Hj4lGPyTAMavTfwhu6MiY4tU7xbrEVxikSdRkiWZrYn7UEQ6JKDP1Ga",
  },
});

// WebSocket link
const wsLink = new WebSocketLink({
  uri: "wss://mutual-flea-53.hasura.app/v1/graphql", // Your WebSocket endpoint
  options: {
    reconnect: true,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret":
          "35gEAdwe2Hj4lGPyTAMavTfwhu6MiY4tU7xbrEVxikSdRkiWZrYn7UEQ6JKDP1Ga",
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

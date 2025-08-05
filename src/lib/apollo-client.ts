import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.APOLLO_URI}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // Application Password WordPress (username:password en base64)
  const adminUsername = process.env.WP_ADMIN_USERNAME;
  const adminPassword = process.env.WP_ADMIN_PASSWORD;
  const basicAuth = Buffer.from(`${adminUsername}:${adminPassword}`).toString(
    "base64"
  );

  return {
    headers: {
      ...headers,
      authorization: `Basic ${basicAuth}`,
    },
  };
});

// Function to create an Apollo Client instance
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;

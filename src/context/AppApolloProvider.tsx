"use client";
import createApolloClient from "@/lib/apollo-client";
import { ApolloProvider } from "@apollo/client";

export function AppApolloProvider({ children }: { children: React.ReactNode }) {
  const client = createApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

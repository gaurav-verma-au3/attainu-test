import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import { HttpLink, InMemoryCache, ApolloClient } from "apollo-client-preset";
import { ApolloLink } from "apollo-link";
import { createUploadLink } from "apollo-upload-client";
const uri =
  process.env.REACT_APP_API_ROOT === "DEV"
    ? "http://localhost:4000/graphql"
    : `${window.location.origin}/graphql`;
const uploadLink = createUploadLink({ uri });
const httpLink = new HttpLink({ uri });
const cache = new InMemoryCache();
// apollo client setup
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([uploadLink, httpLink]),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

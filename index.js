require("dotenv/config");
const express = require("express");
const path = require("path");
const { ApolloServer } = require("apollo-server-express");
const { graphqlUploadExpress } = require("graphql-upload");
const db = require("./config/database");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
db.sync();
async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((r) => app.listen({ port: 4000 }, r));
  console.log(`http://localhost:4000${server.graphqlPath}`);
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "./build/index.html"));
    });
  }
}
startServer();

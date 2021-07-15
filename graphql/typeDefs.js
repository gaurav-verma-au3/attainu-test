const { gql } = require("apollo-server-express");
module.exports = gql`
  scalar Upload
  type File {
    id: ID!
    path: String!
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Video {
    video_id: String!
    name: String!
    url: String!
    public_id: String!
  }

  type Videos {
    videos: [Video!]!
  }

  type Query {
    videos: Videos!
    otherFields: Boolean!
  }
  type Mutation {
    uploadSingleFile(file: Upload!): File
  }
`;

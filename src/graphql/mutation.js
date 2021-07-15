import { gql } from "@apollo/client";
export const UPLOAD_VIDEO = gql`
  mutation ($file: Upload!) {
    uploadSingleFile(file: $file) {
      path
    }
  }
`;

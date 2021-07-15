import { gql } from "@apollo/client";
export const GET_VIDEOS = gql`
  query Query {
    videos {
      videos {
        name
        video_id
        url
        public_id
      }
    }
  }
`;

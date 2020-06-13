import { request } from "graphql-request";

const query = `query {
    workbooks {
      _id,
      title
      parentId
      slides
      type
    }
  }`;

export const getWorkbooks = request(
  "https://dynamiclearning.herokuapp.com/graphql",
  query
);

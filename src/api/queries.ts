import { request } from "graphql-request";
import config from "../../config";

const { apiRootUrl } = config;

export const getWorkbooks = () =>
  request(
    apiRootUrl,
    `query {
      workbookViewer (owner: "13jnafso34") {
        _id
        title
        parentId
        type
      }
  }`
  );

export const getWorkbook = (id: string) =>
  request(
    apiRootUrl,
    `query {
      workbook(workbookId: "${id}") {
        _id
        title
        slides
      }
    }
  `
  );

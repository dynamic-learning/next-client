import request from "./withAuthRequest";

export const getWorkbooks = () =>
  request(
    `query {
      workbookViewer {
        _id
        title
        parentId
        type
      }
  }`
  );

export const getWorkbook = (id: string) =>
  request(
    `query {
      workbook(workbookId: "${id}") {
        _id
        title
        slides
      }
    }
  `
  );

export const getSims = (searchKeyword: string) =>
  request(
    `
      query {
        sims (keyword: "${searchKeyword}") {
          _id
          title
          description
          tags
          owner
          imageURL
        }
      } 
    `
  );

export const login = (email: string, password: string) =>
  request(
    `
      query {
        login (email: "${email}", password: "${password}") {
          userId
          token
          tokenExpiration
          type
          username
        }
      }
    `
  );

export const getCurrentUser = () =>
  request(
    `
      query {
        currentUser {
          _id
          username
        }
      }
    `
  );

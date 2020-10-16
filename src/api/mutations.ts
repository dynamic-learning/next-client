import request from "./withAuthRequest";
import { getNewSlide } from "../utils/workbook";

export const createWorkbook = ({ title }: any) => {
  const stringifiedSlides = JSON.stringify(JSON.stringify([getNewSlide()]));

  return request(
    `mutation {
      createWorkbook (workbook: {
        title: "${title}"
        slides: ${stringifiedSlides}
      }) {
          _id
      }
    }`
  );
};

export const createWorkbookFolder = ({ title }: any) =>
  request(
    `
      mutation {
        createWorkbookFolder(workbookFolder: {
          title: "${title}"
        }) {
          _id
        }
      }
    `
  );

export const deleteWorkbook = ({ _id }: any) =>
  request(
    `
    mutation {
      deleteWorkbook(
        workbookId:"${_id}"
      ) {
        success
      }
    }
  `
  );

export const deleteWorkbookFolder = ({ _id }: any) =>
  request(
    `
    mutation {
      deleteWorkbookFolder(
        workbookFolderId:"${_id}"
      ) {
        success
      }
    }
  `
  );

export const updateWorkbook = ({ _id, field, value }: any) => {
  if (field !== "slides") {
    value = value ? `"${value}"` : null;
  }

  return request(
    `
    mutation {
      updateWorkbook(
        workbookId: "${_id}",
        field: "${field}",
        value: ${value}
      ) {
        _id
        title
        parentId
      }
    }
    `
  );
};

export const updateWorkbookFolder = ({ _id, field, value }: any) => {
  value = value ? `"${value}"` : null;

  return request(
    `
    mutation {
      updateWorkbookFolder(
        workbookFolderId: "${_id}",
        field: "${field}",
        value: ${value}
      ) {
        _id
        title
        parentId
      }
    }
    `
  );
};

export const addSim = ({ _id, title, description, tags, imageURL, owner }: any) => {
  return request(
    `mutation {
      createSim(sim: {
        _id: "${_id}"
        title: "${title}"
        description: "${description}"
        tags: ${JSON.stringify(tags)}
        imageURL: "${imageURL}"
        owner: "${owner}"
      }) {
        _id
      }
    }`
  );
};

export const editSim = ({ _id, title, description, tags, imageURL }: any) => {
  return request(
    `mutation {
      updateSim(
        simId: "${_id}",    
        updatedSim: {
          title: "${title}"
          description: "${description}"
          tags: ${JSON.stringify(tags)}
          imageURL: "${imageURL}"
        }
      ) {
        title
        tags
      }
    }`
  );
};

export const deleteSim = (_id: any) => {
  return request(
    `mutation {
      deleteSim(simId: "${_id}") {
        success
      }
    }`
  );
};

export const signup = (username: string, email: string, password: string) => {
  return request(
    `
      mutation {
        createUser(userInput: {
          email: "${email}",
          password: "${password}",
          username: "${username}"
        }) {
          userId
          token
          tokenExpiration
          type
          username
        }
      }
    `
  );
};

export const loginWithGoogle = (idToken: string) =>
  request(
    `
    mutation {
        loginWithGoogle (idToken: "${idToken}") {
          userId
          token
          tokenExpiration
          type
          username
        }
      }
    `
  );

export const loginWithGithub = (code: string) =>
  request(
    `
      mutation {
        loginWithGithub (code: "${code}") {
          userId
          token
          tokenExpiration
          type
          username
        }
      }
    `
  );

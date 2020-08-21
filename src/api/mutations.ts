import { request } from "graphql-request";
import config from "../../config";
import { getNewSlide } from "../utils/workbook";

const { apiRootUrl } = config;

export const createWorkbook = ({ title }: any) => {
  const stringifiedSlides = JSON.stringify(JSON.stringify([getNewSlide()]));

  return request(
    apiRootUrl,
    `mutation {
      createWorkbook (workbook: {
        title: "${title}",
        owner: "13jnafso34",
        slides: ${stringifiedSlides}
      }) {
          _id
      }
    }`
  );
};
export const createWorkbookFolder = ({ title }: any) =>
  request(
    apiRootUrl,
    `
      mutation {
        createWorkbookFolder(workbookFolder: {
          title: "${title}",
          owner: "13jnafso34"
        }) {
          _id
        }
      }
    `
  );

export const deleteWorkbook = ({ _id }: any) =>
  request(
    apiRootUrl,
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
    apiRootUrl,
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
    apiRootUrl,
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
    apiRootUrl,
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

export const addSim = ({ _id, owner, title, description, tags, imageURL }: any) => {
  return request(
    apiRootUrl,
    `mutation {
      createSim(sim: {
        _id: "${_id}"
        owner: "${owner}"
        title: "${title}"
        description: "${description}"
        tags: ${JSON.stringify(tags)}
        imageURL: "${imageURL}"
      }) {
        _id
        owner
      }
    }`
  );
};

export const editSim = ({ _id,title, description,tags, imageURL }: any) => {
  return request(
    apiRootUrl,
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
  )

}

export const deleteSim= (_id: any) => {
  return request(
    apiRootUrl,
    `mutation {
      deleteSim(simId: "${_id}") {
        success
      }
    }`
  )
}

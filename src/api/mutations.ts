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

export const addSim = ({ id, owner, title, description, tags, imgUrl }: any) => {
  return request(
    apiRootUrl,
    `mutation {
      createSim(sim: {
        _id: "${id}",
        owner: "${owner}",
        title: "${title}",
        description: "${description}",
        tags: "${tags}"
        imageURL: "${imgUrl}"
      }) {
        _id
        owner
      }
    }`
  );
};

export const editSim = ({ id,title, description,tags, imgUrl }: any) => {
  return request(
    apiRootUrl,
    `mutation {
      updateSim(
        simId: "${id}",    
        updatedSim: {
          title: "${title}"
          description: "${description}"
          tags: ${JSON.stringify(tags)}
          imageURL: "${imgUrl}"
        }
      ) {
        title
        tags
      }
    }`
  )

}

export const deleteSim= (id: any) => {
  return request(
    apiRootUrl,
    `mutation {
      deleteSim(simId: "${id}") {
        success
      }
    }`
  )
}

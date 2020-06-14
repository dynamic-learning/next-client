export const getAllDetailsOfAllWorkbooks = `query {
    workbooks {
      _id,
      title
      parentId
      slides
      type
    }
  }`;

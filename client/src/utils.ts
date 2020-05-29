export const isValidSketchUrl = (url: string): boolean => {
  return /^(https?:\/\/)?(www.)?editor.p5js.org\/.*\/sketches\/.*$/.test(url);
};

export const getOwnerFromSketchUrl = (sketchUrl: string): string => {
  const sketchOwner = sketchUrl.match(/p5js.org\/(.*)\/sketches/);
  if (sketchOwner) {
    return sketchOwner[1];
  } else {
    return "";
  }
};
export const getIdFromSketchUrl = (sketchUrl: string): string => {
  const sketchId = sketchUrl.match(/\/sketches\/(.*)/);
  if (sketchId) {
    return sketchId[1];
  } else {
    return "";
  }
};

export const updateItemInArrayAtIndex = (
  array: Array<any>,
  index: number,
  updatedItem: any
) => {
  return [
    ...array.slice(0, index),
    updatedItem,
    ...array.slice(index + 1, array.length),
  ];
};

export const deleteItemInArrayAtIndex = (array: Array<any>, index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1, array.length)];
};

export const addAnItemToArray = (array: Array<any>, newItem: any) => {
  return [...array, newItem];
};

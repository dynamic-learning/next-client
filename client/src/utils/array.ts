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

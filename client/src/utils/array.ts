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

export const reorderArrayItems = (
  array: Array<any>,
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

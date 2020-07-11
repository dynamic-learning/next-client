import { CanvasSimType, SlideType, TextboxType } from "../types";
import { updateItemInArrayAtIndex, deleteItemInArrayAtIndex } from "./array";

export const findIfItsPossibleToReduceCanvasSize = (
  items: Array<any>,
  pageCount: number,
  lowerPointInCanvas: number,
  extraPageSize: number
) => {
  if (pageCount === 0) {
    return false;
  }
  const bottomMostPointOfItems = items.reduce((lowestPoint, curItem) => {
    const bottomPtOfCurItem =
      curItem.position.y + parseInt(curItem.size.height);
    if (bottomPtOfCurItem > lowestPoint) {
      return bottomPtOfCurItem;
    } else {
      return lowestPoint;
    }
  }, -Infinity);
  return lowerPointInCanvas - extraPageSize > bottomMostPointOfItems;
};

export const getNewTextbox = (): TextboxType => {
  return {
    text: "",
    position: {
      x: 20,
      y: 20,
    },
    size: {
      width: "400px",
      height: "200px",
    },
  };
};

export const getNewSim = (owner: string, id: string): CanvasSimType => {
  return {
    owner,
    id,
    position: {
      x: 0,
      y: 0,
    },
    size: {
      width: 640,
      height: 360,
    },
    savedState: null,
  };
};

export const getNewSlide = (): SlideType => {
  return {
    fabricObjects: null,
    sims: [],
    textboxes: [],
    pageCount: 0,
  };
};

// Below functions are used in workbook reducer

export const addItemInCurSlide = (
  state: any,
  itemType: string,
  newItem: any
) => {
  const updatedSlide = {
    ...state.slides[state.curSlide],
    [itemType]: [...state.slides[state.curSlide][itemType], newItem],
  };
  return updatedSlide;
};

export const updateItemInCurSlide = (
  state: any,
  itemType: string,
  updatedItem: any,
  index: number
) => {
  const itemsInCurSlide = state.slides[state.curSlide][itemType];
  const updateIndex = index;
  const updatedSlide = {
    ...state.slides[state.curSlide],
    [itemType]: updateItemInArrayAtIndex(
      itemsInCurSlide,
      updateIndex,
      updatedItem
    ),
  };
  return updatedSlide;
};

export const deleteItemInCurSlide = (
  state: any,
  itemType: string,
  deleteIndex: number
) => {
  const itemsInCurSlide = state.slides[state.curSlide][itemType];
  const updatedSlide = {
    ...state.slides[state.curSlide],
    [itemType]: deleteItemInArrayAtIndex(itemsInCurSlide, deleteIndex),
  };
  return updatedSlide;
};

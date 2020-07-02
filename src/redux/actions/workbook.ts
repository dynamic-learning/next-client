import * as actions from "../action-types/workbook";
import { SlideType } from "../../types";

export const addSlide = () => {
  return {
    type: actions.ADD_SLIDE,
    payload: {},
  };
};

export const deleteSlide = (index: number) => {
  return {
    type: actions.DELETE_SLIDE,
    payload: {
      index,
    },
  };
};

export const changeCurSlide = (newCurSlide: number) => {
  return {
    type: actions.CHANGE_CURRENT_SLIDE,
    payload: {
      newCurSlide,
    },
  };
};

export const clearSlide = () => {
  return {
    type: actions.CLEAR_SLIDE,
    payload: {},
  };
};

export const setFabricObjectsInCurSlide = (fabricObjects: string | null) => {
  return {
    type: actions.SET_FABRIC_OBJECTS_IN_CURSLIDE,
    payload: {
      fabricObjects,
    },
  };
};

export const addItemInCurSlide = (newItem: any, itemType: string) => {
  return {
    type: actions.ADD_ITEM_IN_CURSLIDE,
    payload: {
      newItem,
      itemType,
    },
  };
};

export const updateItemInCurSlide = (
  updatedItem: any,
  index: number,
  itemType: string
) => {
  return {
    type: actions.UPDATE_ITEM_IN_CURSLIDE,
    payload: {
      updatedItem,
      index,
      itemType,
    },
  };
};

export const deleteItemInCurSlide = (deleteIndex: number, itemType: string) => {
  return {
    type: actions.DELETE_ITEM_FROM_CURSLIDE,
    payload: {
      deleteIndex,
      itemType,
    },
  };
};

export const changePageCountInCurSlide = (count: number) => {
  return {
    type: actions.CHANGE_PAGE_COUNT_IN_CURSLIDE,
    payload: {
      count,
    },
  };
};

export const changeCanvasOption = (option: string, value: any) => {
  return {
    type: actions.CHANGE_CANVAS_OPTION,
    payload: {
      option,
      value,
    },
  };
};

export const reorderSlides = (startIndex: number, endIndex: number) => {
  return {
    type: actions.REORDER_SLIDES,
    payload: {
      startIndex,
      endIndex,
    },
  };
};

export const setSlides = (slides: Array<SlideType>) => {
  return {
    type: actions.SET_SLIDES,
    payload: {
      slides,
    },
  };
};

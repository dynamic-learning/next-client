import * as actions from "../action-types/workbook";
import { fabric } from "fabric";
import { CanvasSimType } from "../../types";

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

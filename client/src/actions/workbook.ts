import {
  ADD_SLIDE,
  DELETE_SLIDE,
  CHANGE_CURRENT_SLIDE,
  SET_FABRIC_OBJECTS_IN_CURSLIDE,
} from "../action-types/workbook";
import { fabric } from "fabric";

export const addSlide = () => {
  return {
    type: ADD_SLIDE,
    payload: {},
  };
};

export const deleteSlide = (index: number) => {
  return {
    type: DELETE_SLIDE,
    payload: {
      index,
    },
  };
};

export const changeCurSlide = (newCurSlide: number) => {
  return {
    type: CHANGE_CURRENT_SLIDE,
    payload: {
      newCurSlide,
    },
  };
};

export const setFabricObjectsInCurSlide = (
  fabricObjects: Array<fabric.Object>
) => {
  return {
    type: SET_FABRIC_OBJECTS_IN_CURSLIDE,
    payload: {
      fabricObjects,
    },
  };
};

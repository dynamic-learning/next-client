import * as actions from "../action-types/workbook";
import { SlideType } from "../types";
import {
  addAnItemToArray,
  updateItemInArrayAtIndex,
  deleteItemInArrayAtIndex,
} from "../utils";

export const getNewSlide = (): SlideType => {
  return {
    fabricObjects: null,
    sims: [],
    textboxes: [],
  };
};

const defaultState = {
  slides: [getNewSlide()],
  curSlide: 0,
};

type Action = {
  type: string;
  payload: any;
};

const workbookReducer = (state = defaultState, action: Action) => {
  let updatedSlides, updatedSlide;
  switch (action.type) {
    case actions.ADD_SLIDE:
      updatedSlides = addAnItemToArray(state.slides, getNewSlide());
      return {
        ...state,
        slides: updatedSlides,
        curSlide: updatedSlides.length - 1,
      };

    case actions.DELETE_SLIDE:
      const deleteIndex = action.payload.index;
      if (state.slides.length === 1) {
        return {
          ...state,
          slides: [getNewSlide()],
        };
      } else {
        updatedSlides = deleteItemInArrayAtIndex(state.slides, deleteIndex);
        const isCurSlideBeyondNoOfSlides =
          state.curSlide > updatedSlides.length - 1;
        return {
          ...state,
          slides: updatedSlides,
          curSlide: isCurSlideBeyondNoOfSlides
            ? state.curSlide - 1
            : state.curSlide,
        };
      }

    case actions.CHANGE_CURRENT_SLIDE:
      return {
        ...state,
        curSlide: action.payload.newCurSlide,
      };

    case actions.SET_FABRIC_OBJECTS_IN_CURSLIDE:
      updatedSlide = {
        ...state.slides[state.curSlide],
        fabricObjects: action.payload.fabricObjects,
      };
      updatedSlides = updateItemInArrayAtIndex(
        state.slides,
        state.curSlide,
        updatedSlide
      );
      return {
        ...state,
        slides: updatedSlides,
      };

    case actions.ADD_ITEM_IN_CURSLIDE:
      updatedSlide = addItemInCurSlide(
        state,
        action.payload.itemType,
        action.payload.newItem
      );
      updatedSlides = updateItemInArrayAtIndex(
        state.slides,
        state.curSlide,
        updatedSlide
      );
      return {
        ...state,
        slides: updatedSlides,
      };

    case actions.UPDATE_ITEM_IN_CURSLIDE:
      updatedSlide = updateItemInCurSlide(
        state,
        action.payload.itemType,
        action.payload.updatedItem,
        action.payload.index
      );
      updatedSlides = updateItemInArrayAtIndex(
        state.slides,
        state.curSlide,
        updatedSlide
      );
      return {
        ...state,
        slides: updatedSlides,
      };

    case actions.DELETE_ITEM_FROM_CURSLIDE:
      updatedSlide = deleteItemInCurSlide(
        state,
        action.payload.itemType,
        action.payload.deleteIndex
      );
      updatedSlides = updateItemInArrayAtIndex(
        state.slides,
        state.curSlide,
        updatedSlide
      );
      return {
        ...state,
        slides: updatedSlides,
      };

    default:
      return {
        ...state,
      };
  }
};

const addItemInCurSlide = (state: any, itemType: string, newItem: any) => {
  const updatedSlide = {
    ...state.slides[state.curSlide],
    [itemType]: [...state.slides[state.curSlide][itemType], newItem],
  };
  return updatedSlide;
};

const updateItemInCurSlide = (
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

const deleteItemInCurSlide = (
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

export default workbookReducer;

import {
  ADD_SLIDE,
  DELETE_SLIDE,
  CHANGE_CURRENT_SLIDE,
  SET_FABRIC_OBJECTS_IN_CURSLIDE,
} from "../action-types/workbook";
import { SlideType } from "../types";

export const getNewSlide = (): SlideType => {
  return {
    fabricObjects: [],
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
  switch (action.type) {
    case ADD_SLIDE:
      const newSlides = [...state.slides, getNewSlide()];
      return {
        ...state,
        slides: newSlides,
        curSlide: newSlides.length - 1,
      };
    case DELETE_SLIDE:
      const index = action.payload.index;
      if (state.slides.length === 1) {
        return {
          ...state,
          slides: [getNewSlide()],
        };
      } else {
        return {
          ...state,
          slides: [
            ...state.slides.slice(0, index),
            ...state.slides.slice(index + 1, state.slides.length),
          ],
          curSlide: index === state.slides.length - 1 ? index - 1 : index,
        };
      }
    case CHANGE_CURRENT_SLIDE:
      return {
        ...state,
        curSlide: action.payload.newCurSlide,
      };
    case SET_FABRIC_OBJECTS_IN_CURSLIDE:
      return {
        ...state,
        slides: [
          ...state.slides.slice(0, state.curSlide),
          {
            ...state.slides[state.curSlide],
            fabricObjects: action.payload.fabricObjects,
          },
          ...state.slides.slice(state.curSlide + 1, state.slides.length),
        ],
      };
    default:
      return {
        ...state,
      };
  }
};

export default workbookReducer;

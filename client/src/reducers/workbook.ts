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
  let updatedSlides;
  switch (action.type) {
    case ADD_SLIDE:
      updatedSlides = [...state.slides, getNewSlide()];
      return {
        ...state,
        slides: updatedSlides,
        curSlide: updatedSlides.length - 1,
      };
    case DELETE_SLIDE:
      const deleteIndex = action.payload.index;
      if (state.slides.length === 1) {
        return {
          ...state,
          slides: [getNewSlide()],
        };
      } else {
        updatedSlides = [
          ...state.slides.slice(0, deleteIndex),
          ...state.slides.slice(deleteIndex + 1, state.slides.length),
        ];
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

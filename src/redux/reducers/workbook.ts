import * as actions from "../action-types/workbook";
import {
  addAnItemToArray,
  updateItemInArrayAtIndex,
  deleteItemInArrayAtIndex,
  reorderArrayItems,
} from "../../utils/array";
import {
  getNewSlide,
  updateItemInCurSlide,
  addItemInCurSlide,
  deleteItemInCurSlide,
} from "../../utils/workbook";
import undoable, { excludeAction } from "redux-undo";

const defaultState = {
  slides: [getNewSlide()],
  curSlide: 0,
  canvasOptions: {
    brushStroke: 30,
    color: "#fff",
    interact: true,
    isDrawingMode: null,
  },
};

type Action = {
  type: string;
  payload: any;
};

export const workBookReducer = (state = defaultState, action: Action) => {
  let updatedSlides, updatedSlide;
  switch (action.type) {
    case actions.ADD_SLIDE:
      updatedSlides = addAnItemToArray(state.slides, getNewSlide());
      return {
        ...state,
        slides: updatedSlides,
        curSlide: updatedSlides.length - 1,
      };

    case actions.SET_SLIDES:
      return {
        ...state,
        slides: action.payload.slides,
      };

    case actions.RESET_SLIDES: {
      return {
        ...state,
        curSlide: 0,
        slides: [getNewSlide()],
      };
    }

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

    case actions.CLEAR_SLIDE:
      updatedSlides = updateItemInArrayAtIndex(
        state.slides,
        state.curSlide,
        getNewSlide()
      );
      console.log(updatedSlides);
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

    case actions.CHANGE_PAGE_COUNT_IN_CURSLIDE:
      // To ensure page count is either 0 or greater
      const newPageCount =
        state.slides[state.curSlide].pageCount + action.payload.count >= 0
          ? state.slides[state.curSlide].pageCount + action.payload.count
          : state.slides[state.curSlide].pageCount;
      updatedSlide = {
        ...state.slides[state.curSlide],
        pageCount: newPageCount,
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

    case actions.CHANGE_CANVAS_OPTION:
      return {
        ...state,
        canvasOptions: {
          ...state.canvasOptions,
          [action.payload.option]: action.payload.value,
          interact: getInteractValue(
            action.payload.option,
            action.payload.value,
            state
          ),
          isDrawingMode: getIsDrawingMode(
            action.payload.option,
            action.payload.value,
            state
          ),
        },
      };

    case actions.REORDER_SLIDES:
      updatedSlides = reorderArrayItems(
        state.slides,
        action.payload.startIndex,
        action.payload.endIndex
      );
      return {
        ...state,
        slides: updatedSlides,
        curSlide: action.payload.endIndex,
      };

    default:
      return {
        ...state,
      };
  }
};

const getInteractValue = (option: string, value: boolean, state: any) => {
  if (option === "interact") {
    return value;
  } else if (["isDrawingMode", "brushStroke", "color"].includes(option)) {
    return false;
  } else {
    return state.canvasOptions.interact;
  }
};

const getIsDrawingMode = (option: string, value: boolean, state: any) => {
  if (option === "isDrawingMode") {
    return value;
  }
  if (option === "interact") {
    return null;
  } else {
    return state.canvasOptions.isDrawingMode;
  }
};

const undoableWorkBook = undoable(workBookReducer, { 
  filter: excludeAction([actions.CHANGE_CANVAS_OPTION, actions.SET_SLIDES]),
  clearHistoryType: actions.CLEAR_UNDO_HISTORY
});

export default undoableWorkBook;

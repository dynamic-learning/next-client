import workBookReducer, { getNewSlide } from "../reducers/workbook";
import * as actions from "../actions/workbook";
import { fabric } from "fabric";

const defaultState = {
  slides: [getNewSlide()],
  curSlide: 0,
};

describe("Workbook reducer tests", () => {
  it("adds a slide to the slides", () => {
    const { slides } = workBookReducer(defaultState, actions.addSlide());
    expect(slides.length).toBe(2);
  });
  it("tries to delete when there is only one slide", () => {
    const { slides } = workBookReducer(defaultState, actions.deleteSlide(0));
    expect(slides.length).toBe(1);
  });
  it("deletes slide", () => {
    const state = {
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 0,
    };
    const { slides } = workBookReducer(state, actions.deleteSlide(1));
    expect(slides.length).toBe(1);
  });
  it("decrements curSlide when curSlide is the last slide and last slide is deleted", () => {
    const withTwoSlides = {
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    const { curSlide } = workBookReducer(withTwoSlides, actions.deleteSlide(1));
    expect(curSlide).toBe(0);
  });
  it("sets a fabric object in the slide", () => {
    const fabricObj = new fabric.Rect({
      left: 100,
    });
    const { slides } = workBookReducer(
      defaultState,
      actions.setFabricObjectsInCurSlide([fabricObj])
    );
    expect(slides[0].fabricObjects[0].left).toBe(100);
  });
});

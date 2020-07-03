import { workBookReducer } from "../../redux/reducers/workbook";
import { getNewSlide, getNewTextbox, getNewSim } from "../../utils/workbook";
import * as actions from "../../redux/actions/workbook";

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

describe("Operations on slides", () => {
  it("adds a slide to the slides array", () => {
    const { slides } = workBookReducer(defaultState, actions.addSlide());
    expect(slides.length).toBe(2);
  });
  it("does not make slides array empty when we try to delete the only slide", () => {
    const { slides } = workBookReducer(defaultState, actions.deleteSlide(0));
    expect(slides.length).toBe(1);
  });
  it("correctly deletes a slide at an index", () => {
    const withThreeSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    withThreeSlides.slides[1].fabricObjects = "Dummy fabric string";
    const witTwoSlides = workBookReducer(
      withThreeSlides,
      actions.deleteSlide(1)
    );
    expect(witTwoSlides.slides.length).toBe(2);
    expect(witTwoSlides.slides[0].fabricObjects).toBe(null);
    expect(witTwoSlides.slides[1].fabricObjects).toBe(null);
  });
  it("changes a slide no", () => {
    const withTwoSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    const { curSlide } = workBookReducer(
      withTwoSlides,
      actions.changeCurSlide(0)
    );
    expect(curSlide).toBe(0);
  });
  it("clears a slide contents", () => {
    const withOneSlides = {
      ...defaultState,
      slides: [getNewSlide()],
      curSlide: 0,
    };
    withOneSlides.slides[0].sims.push(sampleSim);
    const { slides } = workBookReducer(withOneSlides, actions.clearSlide());
    expect(slides[0].sims.length).toBe(0);
  });
  it("deletes a slide when curSlide is at the last index and checks if curSlide is decremented", () => {
    const withTwoSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    const { curSlide } = workBookReducer(withTwoSlides, actions.deleteSlide(1));
    expect(curSlide).toBe(0);
  });

  it("reorders slide", () => {
    const withTwoSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    withTwoSlides.slides[0].sims.push(sampleSim);
    withTwoSlides.slides[1].sims.push(sampleSim1);
    const { slides } = workBookReducer(
      withTwoSlides,
      actions.reorderSlides(0, 1)
    );
    expect(slides[0].sims[0].owner).toBe("nithin");
    expect(slides[1].sims[0].owner).toBe("jithin");
  });

  it("returns default state", () => {
    const withOneSlide = {
      ...defaultState,
    };
    withOneSlide.slides[0].textboxes.push(getNewTextbox());
    const newState = workBookReducer(withOneSlide, {
      type: "random",
      payload: {},
    });
    expect(newState).toEqual(withOneSlide);
  });
});

///////////////////////////////////////////////
//////////////////////////////////////////////
/////////////////////////////////////////////

describe("Operation on a slide", () => {
  it("increases pageCount", () => {
    const withOneSlide = {
      ...defaultState,
      slides: [getNewSlide()],
      curSlide: 0,
    };
    const { slides } = workBookReducer(
      withOneSlide,
      actions.changePageCountInCurSlide(1)
    );
    expect(slides[0].pageCount).toBe(1);
  });
  it("sets a fabric object in the current slide", () => {
    const withTwoSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    const fabricObj = "dummy object";
    const { slides } = workBookReducer(
      withTwoSlides,
      actions.setFabricObjectsInCurSlide(fabricObj)
    );
    expect(slides[1].fabricObjects).toBe(fabricObj);
  });
  it("adds an item to current slide", () => {
    const withThreeSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    const { slides } = workBookReducer(
      withThreeSlides,
      actions.addItemInCurSlide(sampleSim, "sims")
    );
    expect(slides[1].sims.length).toBe(1);
    expect(slides[1].sims[0]).toStrictEqual(sampleSim);
  });
  it("updates an item in current slide", () => {
    const withThreeSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    withThreeSlides.slides[1].sims.push(sampleSim);
    withThreeSlides.slides[1].sims.push(sampleSim);
    const { slides } = workBookReducer(
      withThreeSlides,
      actions.updateItemInCurSlide(
        {
          ...sampleSim,
          position: { x: 50, y: 70 },
        },
        1,
        "sims"
      )
    );
    expect(slides[1].sims[1].position.x).toBe(50);
    expect(slides[1].sims[1].position.y).toBe(70);
  });
  it("deletes an item in current slide", () => {
    const withTwoSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    withTwoSlides.slides[1].sims.push(sampleSim);
    withTwoSlides.slides[1].sims.push(sampleSim);
    const { slides } = workBookReducer(
      withTwoSlides,
      actions.deleteItemInCurSlide(1, "sims")
    );
    expect(slides[1].sims.length).toBe(1);
  });
  it("decreases pageCount", () => {
    const withOneSlide = {
      ...defaultState,
      slides: [getNewSlide()],
      curSlide: 0,
    };
    withOneSlide.slides[0].pageCount = 1;
    const { slides } = workBookReducer(
      withOneSlide,
      actions.changePageCountInCurSlide(-1)
    );
    expect(slides[0].pageCount).toBe(0);
  });
  it("changes selected color in canvas", () => {
    const withOneSlide = {
      ...defaultState,
    };
    const { canvasOptions } = workBookReducer(
      withOneSlide,
      actions.changeCanvasOption("color", "#000")
    );
    expect(canvasOptions.color).toBe("#000");
  });
  it("enables interact in canvas", () => {
    const withOneSlide = {
      ...defaultState,
    };
    const { canvasOptions } = workBookReducer(
      withOneSlide,
      actions.changeCanvasOption("interact", true)
    );
    expect(canvasOptions.interact).toBe(true);
    expect(canvasOptions.isDrawingMode).toBe(null);
  });
  it("enables isDrawingMode in canvas", () => {
    const withOneSlide = {
      ...defaultState,
    };
    const { canvasOptions } = workBookReducer(
      withOneSlide,
      actions.changeCanvasOption("isDrawingMode", true)
    );
    expect(canvasOptions.isDrawingMode).toBe(true);
    expect(canvasOptions.interact).toBe(false);
  });
  // To provide 100% coverage
  it("sets options other than color, isDrawingMode, interact, brushStroke", () => {
    const withOneSlide = {
      ...defaultState,
    };
    workBookReducer(
      withOneSlide,
      actions.changeCanvasOption("otherOption", true)
    );
  });
});

const sampleSim = getNewSim("jithin", "random_id");
const sampleSim1 = getNewSim("nithin", "random_id");

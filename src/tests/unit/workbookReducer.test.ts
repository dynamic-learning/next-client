import { workBookReducer } from "../../redux/workbook/reducer";
import { getNewSlide } from "../../utils/workbook";
import * as actions from "../../redux/workbook/actions";

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

describe("Workbook reducer tests", () => {
  it("adds a slide to the slides array", () => {
    const { slides } = workBookReducer(undefined, actions.addSlide());
    expect(slides.length).toBe(2);
  });
  it("does not make slides array empty when we try to delete the only slide", () => {
    const { slides } = workBookReducer(undefined, actions.deleteSlide(0));
    expect(slides.length).toBe(1);
  });
  it("correctly deletes a slide at an index", () => {
    let withThreeSlides = {
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
  it("deletes a slide when curSlide is at the last index and checks if curSlide is decremented", () => {
    const withTwoSlides = {
      ...defaultState,
      slides: [getNewSlide(), getNewSlide()],
      curSlide: 1,
    };
    const { curSlide } = workBookReducer(withTwoSlides, actions.deleteSlide(1));
    expect(curSlide).toBe(0);
  });
  it("sets a fabric object in the current slide", () => {
    let withTwoSlides = {
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
    let withThreeSlides = {
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
    let withThreeSlides = {
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
    let withTwoSlides = {
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
});

const sampleSim = {
  owner: "jithin",
  id: "random_id",
  position: {
    x: 0,
    y: 0,
  },
  size: {
    width: 640,
    height: 360,
  },
};

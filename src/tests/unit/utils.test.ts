import {
  isValidSketchUrl,
  getIdFromSketchUrl,
  getOwnerFromSketchUrl,
} from "../../utils/sketch";

import { findIfItsPossibleToReduceCanvasSize } from "../../utils/workbook";

describe("Sketch utils", () => {
  const validSketchUrl =
    "https://www.editor.p5js.org/jithunni.ks/sketches/r1rer94WX";
  it("tests if valid sketch is accepted", () => {
    expect(isValidSketchUrl(validSketchUrl)).toBe(true);
  });
  it("tests if invalid sketch is rejected", () => {
    const invalidSketchUrl =
      "https://www.eitor.p5js.org/jithunni.ks/sketches/r1rer94WX";
    expect(isValidSketchUrl(invalidSketchUrl)).toBe(false);
  });
  it("tests if sketch Id is extracted correctly from url", () => {
    expect(getIdFromSketchUrl(validSketchUrl)).toBe("r1rer94WX");
  });
  it("tests if owner Id is extracted correctly from url", () => {
    expect(getOwnerFromSketchUrl(validSketchUrl)).toBe("jithunni.ks");
  });
  it("tests if empty String is returned from wrong url", () => {
    expect(getOwnerFromSketchUrl('random_string')).toBe("");
  });
  it("tests if empty String is returned from wrong url", () => {
    expect(getIdFromSketchUrl('random_string')).toBe("");
  });
});

describe("Workbooks", () => {
  const items = [
    {
      position: {
        x: 20,
        y: 400,
      },
      size: {
        height: 50,
        width: 100,
      },
    },
    {
      position: {
        x: 20,
        y: 30,
      },
      size: {
        height: 100,
        width: 50,
      },
    },
  ];
  it("does not allow canvas size to be reduced if the reduced height is less than bottom most point", () => {
    expect(findIfItsPossibleToReduceCanvasSize(items, 1, 520, 100)).toBe(false);
  });
  it("allows canvas size to be reduced if the reduced height is greater than bottom most point", () => {
    expect(findIfItsPossibleToReduceCanvasSize(items, 1, 620, 100)).toBe(true);
  });
  it("does not allow canvas size to be reduced if there are no extra pages", () => {
    expect(findIfItsPossibleToReduceCanvasSize(items, 0, 620, 100)).toBe(false);
  });
});

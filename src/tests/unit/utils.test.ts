import {
  isValidIframeTag,
  getIdFromIframeTag,
  getOwnerFromIframeTag,
} from "../../utils/sketch";

import { findIfItsPossibleToReduceCanvasSize } from "../../utils/workbook";

describe("Sketch utils", () => {
  const validSketchUrl =
    '<iframe src="https://editor.p5js.org/jithunni.ks/embed/WSbZvLqts"></iframe>';
  it("tests if valid sketch is accepted", () => {
    expect(isValidIframeTag(validSketchUrl)).toBe(true);
  });
  it("tests if invalid sketch is rejected", () => {
    const invalidSketchUrl =
      '<iframe src="https://edtor.p5js.org/jithunni.ks/embed/WSbZvLqts"></iframe>';
    expect(isValidIframeTag(invalidSketchUrl)).toBe(false);
  });
  it("tests if sketch Id is extracted correctly from url", () => {
    expect(getIdFromIframeTag(validSketchUrl)).toBe("WSbZvLqts");
  });
  it("tests if owner Id is extracted correctly from url", () => {
    expect(getOwnerFromIframeTag(validSketchUrl)).toBe("jithunni.ks");
  });
  it("tests if empty String is returned from wrong url", () => {
    expect(getOwnerFromIframeTag("random_string")).toBe("");
  });
  it("tests if empty String is returned from wrong url", () => {
    expect(getIdFromIframeTag("random_string")).toBe("");
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

import {
  isValidSketchUrl,
  getIdFromSketchUrl,
  getOwnerFromSketchUrl,
} from "../../utils";

describe("Utils", () => {
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
});

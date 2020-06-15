export const isValidSketchUrl = (url: string): boolean => {
  return /^(https?:\/\/)?(www.)?editor.p5js.org\/.*\/sketches\/.*$/.test(url);
};

export const getOwnerFromSketchUrl = (sketchUrl: string): string => {
  const sketchOwner = sketchUrl.match(/p5js.org\/(.*)\/sketches/);
  if (sketchOwner) {
    return sketchOwner[1];
  } else {
    return "";
  }
};
export const getIdFromSketchUrl = (sketchUrl: string): string => {
  const sketchId = sketchUrl.match(/\/sketches\/(.*)/);
  if (sketchId) {
    return sketchId[1];
  } else {
    return "";
  }
};

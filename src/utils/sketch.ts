export const isValidIframeTag = (iframeLink: string): boolean => {
  return /<iframe src="https:\/\/editor.p5js.org\/(.*)\/embed\/(.*)"><\/iframe>/.test(
    iframeLink
  );
};

export const getOwnerFromIframeTag = (iframeTag: string): string => {
  const sketchOwner = iframeTag.match(/p5js.org\/(.*)\/embed/);
  if (sketchOwner) {
    return sketchOwner[1];
  } else {
    return "";
  }
};

export const getIdFromIframeTag = (iframeTag: string): string => {
  const sketchId = iframeTag.match(/embed\/(.*)"><\/iframe>/);
  if (sketchId) {
    return sketchId[1];
  } else {
    return "";
  }
};

export type SlideType = {
  fabricObjects: string | null;
  sims: Array<CanvasSimType>;
  textboxes: Array<TextboxType>;
  pageCount: number;
};

export type CanvasSimType = {
  owner: string;
  id: string;
  size: {
    width: number;
    height: number;
  };
  position: {
    x: number;
    y: number;
  };
};

export type TextboxType = {
  text: string;
  size: {
    width: string;
    height: string;
  };
  position: {
    x: number;
    y: number;
  };
};

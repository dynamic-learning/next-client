import { fabric } from "fabric";

export type SlideType = {
  fabricObjects: string | null;
  sims: Array<CanvasSimType>;
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

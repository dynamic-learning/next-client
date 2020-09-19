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
  savedState: any;
};

export type Sim = {
  owner: string;
  _id: string;
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

export type AuthData = {
  token: string;
  type: string;
  username: string;
  userId: string;
};

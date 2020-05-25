import Canvas from "./Canvas";
import { fabric } from "fabric";
import { SlideType } from "../../../types";

type Props = {
  onCanvasChange(fabricObjects: Array<fabric.Object>): void;
  slideContents: SlideType;
};

const Slide = (props: Props) => {
  const { onCanvasChange, slideContents } = props;
  const { fabricObjects } = slideContents;
  return (
    <Canvas onCanvasChange={onCanvasChange} fabricObjects={fabricObjects} />
  );
};

export default Slide;

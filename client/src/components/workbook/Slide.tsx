import Canvas from "./Canvas";
import { fabric } from "fabric";
import { SlideType } from "../../types";

type Props = {
  onCanvasChange(fabricObjects: Array<fabric.Object>): void;
  slideInput: SlideType;
};

const Slide = (props: Props) => {
  const { onCanvasChange, slideInput } = props;
  const { fabricObjects } = slideInput;
  return (
    <Canvas onCanvasChange={onCanvasChange} fabricObjects={fabricObjects} />
  );
};

export default Slide;

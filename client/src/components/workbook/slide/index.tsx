import Canvas from "./Canvas";
import { SlideType } from "../../../types";
import Sims from "./sims";
import { useState } from "react";
import Textboxes from "./textboxes";

type Props = {
  onCanvasUpdate(fabricObjects: string | null): void;
  slideContents: SlideType;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
  scaleX: number;
  canvasSize: any;
};

const Slide = (props: Props) => {
  const {
    onCanvasUpdate,
    slideContents,
    onItemUpdate,
    onItemDelete,
    scaleX,
    canvasSize,
  } = props;
  const { fabricObjects, sims, textboxes, pageCount } = slideContents;

  // Used to disable the pointer events in moveable /resizeable items when
  // any of the item is moved or resized
  const [isTransforming, setIsTransforming] = useState(false);
  return (
    <>
      <style>{getStyle({ ...canvasSize, pageCount, scaleX })}</style>
      <div className="slide">
        <Sims
          onItemDelete={onItemDelete}
          onItemUpdate={onItemUpdate}
          setIsTransforming={setIsTransforming}
          sims={sims}
          isTransforming={isTransforming}
          scaleX={scaleX}
        />
        <Textboxes
          onItemDelete={onItemDelete}
          onItemUpdate={onItemUpdate}
          setIsTransforming={setIsTransforming}
          textboxes={textboxes}
          isTransforming={isTransforming}
          scaleX={scaleX}
        />
        <Canvas
          pageCount={pageCount}
          onChange={onCanvasUpdate}
          fabricObjects={fabricObjects}
        />
      </div>
    </>
  );
};

const getStyle = ({ width, height, pageCount, scaleX, extraPageSize }: any) => `
  .slide {
    padding:1rem;
    height:${height + pageCount * extraPageSize}px;
    width:${width}px;
    transform:scale(${scaleX});
    transform-origin: top left;
    overflow:hidden;
  }
`;

export default Slide;

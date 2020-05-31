import Canvas from "./Canvas";
import { fabric } from "fabric";
import { SlideType } from "../../../types";
import Sims from "./sims";
import ThemeContext from "../../../contexts/index";
import { useContext } from "react";
import { useState } from "react";

type Props = {
  onCanvasUpdate(fabricObjects: string | null): void;
  slideContents: SlideType;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
};

const Slide = (props: Props) => {
  const { onCanvasUpdate, slideContents, onItemUpdate, onItemDelete } = props;
  const { fabricObjects, sims } = slideContents;
  const { theme } = useContext(ThemeContext);

  // Used to disable the pointer events in moveable /resizeable items when
  // any of the item is moved or resized
  const [isTransforming, setIsTransforming] = useState(false);
  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="slide">
        <Sims
          onItemDelete={onItemDelete}
          onItemUpdate={onItemUpdate}
          sims={sims}
          setIsTransforming={setIsTransforming}
          isTransforming={isTransforming}
        />
        <Canvas onChange={onCanvasUpdate} fabricObjects={fabricObjects} />
      </div>
    </>
  );
};

const getStyle = ({ color3 }: any) => `
  .slide {
    padding:1rem;
    background-color:${color3};
    height:100%;
  }
`;

export default Slide;

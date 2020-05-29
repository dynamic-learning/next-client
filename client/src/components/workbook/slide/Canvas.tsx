import { fabric } from "fabric";
import { useEffect } from "react";

let canvasConfig = {
  isDrawingMode: true,
  width: 640,
  height: 360,
  backgroundColor: "black",
};

type Props = {
  onChange(fabricObjects: Array<fabric.Object>): void;
  fabricObjects: Array<fabric.Object>;
};

let canvas: fabric.Canvas;

const Slide = (props: Props) => {
  const { fabricObjects, onChange } = props;

  useEffect(() => {
    canvas = new fabric.Canvas("canvas", canvasConfig);
    canvas.freeDrawingBrush.color = "white";
    canvas.freeDrawingBrush.width = 2;
    registerEvents();
    resizeCanvasToFillItsContainer();
  }, []);

  const registerEvents = () => {
    canvas.on("mouse:up", handleMouseUp);
  };

  const handleMouseUp = () => {
    onChange(canvas.getObjects());
  };

  const resizeCanvasToFillItsContainer = () => {
    const { width, height } = getDimensionsOfElement(".canvas-container");
    setPropInCanvas("width", width);
    setPropInCanvas("height", height);
  };

  const getDimensionsOfElement = (selector: string) => {
    let canvasContainerRef = document.querySelector(selector) as HTMLDivElement;
    return {
      width: canvasContainerRef.offsetWidth,
      height: canvasContainerRef.offsetHeight,
    };
  };

  const setPropInCanvas = (prop: string, value: number) => {
    // Dimensions need to be updated in 3 places
    // Fabric canvas reference, upper canvas, lower canvas

    // @ts-ignore
    canvas[prop] = value;
    setPropInSelector(".upper-canvas", prop, value);
    setPropInSelector(".lower-canvas", prop, value);
  };

  const setPropInSelector = (selector: string, prop: string, value: number) => {
    const canvasRef = document.querySelector(selector) as MappingWithStringKey;
    canvasRef.style[prop] = `${value}px`;
    canvasRef[prop] = value;
  };

  // MappingWithStringKey is defined to specify index signature (prop)
  // to be of type string
  interface MappingWithStringKey {
    [key: string]: any;
  }

  useEffect(() => {
    if (fabricObjects.length === 0) {
      clearCanvas();
    } else {
      clearCanvas();
      canvas.add(...fabricObjects);
    }
  }, [fabricObjects]);

  const clearCanvas = () => {
    canvas.clear();
    canvas.backgroundColor = "black";
  };

  return (
    <>
      <style>{style}</style>
      <canvas id="canvas"></canvas>
    </>
  );
};

// canvas-container is a class specified by fabric library
// Unless !important is provided, the styles in fabric is not overridden
const style = `
  .canvas-container {
    width:100% !important;
    height:100% !important;
    max-width:100% !important;
  }
`;

export default Slide;

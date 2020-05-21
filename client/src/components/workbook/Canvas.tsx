import { fabric } from "fabric";
import { useEffect } from "react";

let canvasConfig = {
  isDrawingMode: true,
  width: 640,
  height: 360,
  backgroundColor: "black",
};

type Props = {
  onCanvasChange(fabricObjects: Array<fabric.Object>): void;
  fabricObjects: Array<fabric.Object>;
};

let canvas: fabric.Canvas;

const Slide = (props: Props) => {
  const { fabricObjects, onCanvasChange } = props;

  useEffect(() => {
    canvas = new fabric.Canvas("canvas", canvasConfig);
    canvas.freeDrawingBrush.color = "white";
    canvas.freeDrawingBrush.width = 2;
    registerEvents();
  }, []);

  const handleMouseUp = () => {
    onCanvasChange(canvas.getObjects());
  };

  const registerEvents = () => {
    canvas.on("mouse:up", handleMouseUp);
  };

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

  return <canvas id="canvas"></canvas>;
};

export default Slide;

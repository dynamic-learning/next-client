import { Rnd } from "react-rnd";

interface Props {
  item: any;
  index: number;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  children: any;
  setIsTransforming(isTransforming: boolean): void;
  type: string;
}

const MoveAndResize = (props: Props) => {
  const { item, index, onItemUpdate, setIsTransforming, type } = props;
  const handleDragStop = (index: number) => {
    return (_e: any, d: any) => {
      changePosition({ position: { x: d.x, y: d.y } }, index);
      setIsTransforming(false);
    };
  };

  const changePosition = (position: any, index: number) => {
    onItemUpdate(
      {
        ...item,
        ...position,
      },
      index,
      type
    );
  };

  const handleResize = (index: number) => {
    return (
      _e: any,
      _direction: any,
      ref: any,
      _delta: any,
      _position: any
    ) => {
      changeSize(
        {
          size: {
            width: ref.style.width,
            height: ref.style.height,
          },
        },
        index
      );
    };
  };

  const changeSize = (size: any, index: number) => {
    onItemUpdate(
      {
        ...item,
        ...size,
      },
      index,
      type
    );
  };

  const resizeConfig = {
    top: false,
    bottom: false,
    left: false,
    right: false,
    topLeft: false,
    topRight: false,
    bottomLeft: false,
    bottomRight: true,
  };

  const handleDragStart = () => {
    setIsTransforming(true);
  };

  const handleResizeStart = () => {
    setIsTransforming(true);
  };

  const handleResizeStop = () => {
    setIsTransforming(false);
  };

  return (
    <>
      <style>{style}</style>
      <Rnd
        dragHandleClassName="dragHandle"
        enableResizing={resizeConfig}
        size={item.size}
        position={item.position}
        onDragStop={handleDragStop(index)}
        onResize={handleResize(index)}
        bounds=".canvas-container"
        className="item"
        onDragStart={handleDragStart}
        onResizeStart={handleResizeStart}
        onResizeStop={handleResizeStop}
      >
        {props.children}
      </Rnd>
    </>
  );
};

const style = `
    .item {
        z-index:1;
    }
`;

export default MoveAndResize;

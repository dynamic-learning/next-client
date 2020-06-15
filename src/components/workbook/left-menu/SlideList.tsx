import SlideButton from "./SlideButton";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

type Props = {
  noOfSlides: number;
  onSlideButtonClick(slideNo: number): any;
  onDeleteSlideButtonClick(slideNo: number): any;
  curSlide: number;
  onFinishReorder(startIndex: number, endIndex: number): void;
};

const SlideList = (props: Props) => {
  const {
    noOfSlides,
    onSlideButtonClick,
    onDeleteSlideButtonClick,
    curSlide,
    onFinishReorder,
  } = props;

  const renderSlides = () => {
    const slides = [];
    for (let slideNo = 0; slideNo < noOfSlides; slideNo++) {
      slides.push(
        <SlideButton
          key={slideNo}
          slideNo={slideNo}
          onDeleteButtonClick={onDeleteSlideButtonClick}
          onSlideButtonClick={onSlideButtonClick}
          isSlideSelected={curSlide === slideNo}
        />
      );
    }
    return slides;
  };

  const handleDragEnd = (result: any) => {
    onFinishReorder(result.source.index, result.destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {renderSlides()}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default SlideList;

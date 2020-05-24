import SlideButton from "./SlideButton";

type Props = {
  noOfSlides: number;
  onSlideButtonClick(slideNo: number): any;
  onDeleteSlideButtonClick(slideNo: number): any;
  curSlide: number;
};

const SlideList = (props: Props) => {
  const {
    noOfSlides,
    onSlideButtonClick,
    onDeleteSlideButtonClick,
    curSlide,
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

  return (
    <>
      <div>{renderSlides()}</div>
    </>
  );
};

export default SlideList;

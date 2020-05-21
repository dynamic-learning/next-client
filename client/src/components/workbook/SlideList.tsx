import SlideButton from "./SlideButton";

type Props = {
  noOfSlides: number;
  onSlideButtonClick(slideNo: number): any;
  onSlideDeleteButtonClick(slideNo: number): any;
};

const SlideList = (props: Props) => {
  const { noOfSlides, onSlideButtonClick, onSlideDeleteButtonClick } = props;

  const renderSlides = () => {
    const slides = [];
    for (let slideNo = 0; slideNo < noOfSlides; slideNo++) {
      slides.push(
        <SlideButton
          key={slideNo}
          slideNo={slideNo}
          onDeleteButtonClick={onSlideDeleteButtonClick}
          onSlideButtonClick={onSlideButtonClick}
        />
      );
    }
    return slides;
  };

  return <div>{renderSlides()}</div>;
};

export default SlideList;

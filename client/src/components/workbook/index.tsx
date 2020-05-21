import SlideList from "./SlideList";
import { connect } from "react-redux";
import {
  addSlide,
  deleteSlide,
  changeCurSlide,
  setFabricObjectsInCurSlide,
} from "../../actions/workbook";
import Slide from "./Slide";
import { SlideType } from "../../types";

interface WorkbookMethods {
  onSlideAddButtonClick(): void;
  onSlideDeleteButtonClick(slideNo: number): void;
  onSlideButtonClick(slideNo: number): void;
  onCanvasChange(fabricObjects: Array<fabric.Object>): void;
}

interface WorkbookProps {
  curSlide: number;
  slides: Array<SlideType>;
}

type Props = WorkbookMethods & WorkbookProps;

const Workbook = (props: Props) => {
  const {
    onSlideAddButtonClick,
    curSlide,
    onSlideDeleteButtonClick,
    onSlideButtonClick,
    slides,
    onCanvasChange,
  } = props;

  const noOfSlides = slides.length;

  return (
    <div>
      <h1>{curSlide}</h1>
      <button onClick={onSlideAddButtonClick}>Add</button>
      <SlideList
        noOfSlides={noOfSlides}
        onSlideButtonClick={onSlideButtonClick}
        onSlideDeleteButtonClick={onSlideDeleteButtonClick}
      />
      <Slide onCanvasChange={onCanvasChange} slideInput={slides[curSlide]} />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Function): WorkbookMethods => {
  return {
    onSlideAddButtonClick: () => {
      dispatch(addSlide());
    },
    onSlideDeleteButtonClick: (index: number) => {
      dispatch(deleteSlide(index));
    },
    onSlideButtonClick: (slideNo: number) => {
      dispatch(changeCurSlide(slideNo));
    },
    onCanvasChange: (fabricObjects: Array<fabric.Object>) => {
      dispatch(setFabricObjectsInCurSlide(fabricObjects));
    },
  };
};

const mapStateToProps = (state: any): WorkbookProps => {
  return {
    curSlide: state.curSlide,
    slides: state.slides,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Workbook);

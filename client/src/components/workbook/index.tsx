import { connect } from "react-redux";
import {
  addSlide,
  deleteSlide,
  changeCurSlide,
  setFabricObjectsInCurSlide,
} from "../../actions/workbook";
import Slide from "./slide/Slide";
import { SlideType } from "../../types";
import LeftMenu from "./left-menu";

interface WorkbookMethods {
  onAddSlideButtonClick(): void;
  onDeleteSlideButtonClick(slideNo: number): void;
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
    onAddSlideButtonClick,
    curSlide,
    onDeleteSlideButtonClick,
    onSlideButtonClick,
    slides,
    onCanvasChange,
  } = props;

  const noOfSlides = slides.length;

  return (
    <>
      <style>{style}</style>
      <div className="workbook-container">
        <LeftMenu
          onAddSlideButtonClick={onAddSlideButtonClick}
          onSlideButtonClick={onSlideButtonClick}
          onDeleteSlideButtonClick={onDeleteSlideButtonClick}
          curSlide={curSlide}
          noOfSlides={noOfSlides}
        />
        <Slide
          onCanvasChange={onCanvasChange}
          slideContents={slides[curSlide]}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Function): WorkbookMethods => {
  return {
    onAddSlideButtonClick: () => {
      dispatch(addSlide());
    },
    onDeleteSlideButtonClick: (index: number) => {
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

const style = `
  .workbook-container {
    display:flex;
    flex-direction:row;
    height:100vh;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Workbook);

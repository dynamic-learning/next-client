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
import ThemeContext from "../../contexts";
import { useContext } from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

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
  const { darkTheme } = useContext(ThemeContext);

  const AddSlide = () => (
    <div className="add-button" onClick={onAddSlideButtonClick}>
      <PlusCircleOutlined size={20} className="add-icon" />
    </div>
  );

  return (
    <>
      <style>{getStyles(darkTheme)}</style>
      <div className="workbook-container">
        <div className="left-menu">
          <h1>{curSlide}</h1>
          <AddSlide />
          <SlideList
            noOfSlides={noOfSlides}
            onSlideButtonClick={onSlideButtonClick}
            onDeleteSlideButtonClick={onDeleteSlideButtonClick}
            curSlide={curSlide}
          />
        </div>
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

const getStyles = ({ color2, color4, color5 }: any) => `
  .workbook-container {
    display:flex;
    flex-direction:row;
    height:100vh;
  }
  .workbook-container h1 {
    color:white;
    text-align:center;
  }
  .left-menu {
    background-color:${color2};
    padding:1rem;
    width:11rem;
    overflow-y:auto;
  }
  .add-button {
    text-align:center;
    margin-bottom:1rem;
    background-color: ${color4};
    padding:0.5rem;
    cursor:pointer;
  }
  .add-button:hover {
    background-color: ${color5};
  }
  .add-icon {
    margin:0 auto;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Workbook);

import { connect } from "react-redux";
import {
  addSlide,
  deleteSlide,
  changeCurSlide,
  setFabricObjectsInCurSlide,
  addItemInCurSlide,
  updateItemInCurSlide,
  deleteItemInCurSlide,
} from "../../actions/workbook";
import Slide from "./slide/Slide";
import { SlideType } from "../../types";
import LeftMenu from "./left-menu";
import { useState } from "react";
import AddSimModal from "./modals/AddSimModal";
import TopBar from '../workbook/topbar/TopBar'

interface WorkbookMethods {
  onAddSlideButtonClick(): void;
  onDeleteSlideButtonClick(slideNo: number): void;
  onSlideButtonClick(slideNo: number): void;
  onCanvasUpdate(fabricObjects: Array<fabric.Object>): void;

  onItemAdd(newItem: any, itemType: string): void;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
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
    onCanvasUpdate,
    onItemAdd,
    onItemDelete,
    onItemUpdate,
  } = props;

  const noOfSlides = slides.length;
  const [showAddSimModal, setShowAddSimModal] = useState(false);

  const handleAddSimButtonClick = () => {
    setShowAddSimModal(true);
  };

  const handleAddSimModalClose = () => {
    setShowAddSimModal(false);
  };

  return (
    <>
      <style>{style}</style>
      <TopBar />
      <AddSimModal
        showAddSimModal={showAddSimModal}
        handleAddSimModalClose={handleAddSimModalClose}
        onItemAdd={onItemAdd}
      />
      <div className="workbook-container">
        <div className="left-menu-container">
          <LeftMenu
            onAddSlideButtonClick={onAddSlideButtonClick}
            onSlideButtonClick={onSlideButtonClick}
            onDeleteSlideButtonClick={onDeleteSlideButtonClick}
            curSlide={curSlide}
            noOfSlides={noOfSlides}
          />
        </div>
        <div className="slide-container">
          <Slide
            onCanvasUpdate={onCanvasUpdate}
            onItemUpdate={onItemUpdate}
            onItemDelete={onItemDelete}
            slideContents={slides[curSlide]}
          />
        </div>
      </div>
      <button onClick={handleAddSimButtonClick}>Add sim</button>
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
    onCanvasUpdate: (fabricObjects: Array<fabric.Object>) => {
      dispatch(setFabricObjectsInCurSlide(fabricObjects));
    },
    onItemAdd: (newItem: any, itemType: string) => {
      dispatch(addItemInCurSlide(newItem, itemType));
    },
    onItemUpdate: (updatedItem: any, index: number, itemType: string) => {
      dispatch(updateItemInCurSlide(updatedItem, index, itemType));
    },
    onItemDelete: (deleteIndex: number, itemType: string) => {
      dispatch(deleteItemInCurSlide(deleteIndex, itemType));
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
    width:100vw;
    height:100vh;
    display:flex;
    flex-direction:row;
    max-width:100%;
  }
  .slide-container {
    flex:14;
  }
  .left-menu-container {
    flex:2;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Workbook);

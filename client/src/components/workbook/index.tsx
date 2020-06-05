import { useState } from "react";
import { connect } from "react-redux";
import {
  addSlide,
  deleteSlide,
  changeCurSlide,
  setFabricObjectsInCurSlide,
  addItemInCurSlide,
  updateItemInCurSlide,
  deleteItemInCurSlide,
} from "../../redux/actions/workbook";
import Slide from "./slide";
import { SlideType } from "../../types";
import LeftMenu from "./left-menu";
import TopBar from "./top-menu";
import AddSimModal from "./modals/AddSimModal";
import { useRouter } from "next/router";
import { TextboxType } from "../../types";
import { ActionCreators } from "redux-undo";
import { useEffect } from "react";

interface WorkbookMethods {
  onAddSlideButtonClick(): void;
  onDeleteSlideButtonClick(slideNo: number): void;
  onSlideButtonClick(slideNo: number): void;
  onCanvasUpdate(fabricObjects: string | null): void;

  onItemAdd(newItem: any, itemType: string): void;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
  onUndoChange(): void;
  onRedoChange(): void;
}

interface WorkbookProps {
  curSlide: number;
  slides: Array<SlideType>;
  undoable: boolean;
  redoable: boolean;
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
    onUndoChange,
    onRedoChange,
    undoable,
    redoable,
  } = props;

  const noOfSlides = slides.length;
  const [showAddSimModal, setShowAddSimModal] = useState(false);
  const router = useRouter();

  const handleAddSimButtonClick = () => {
    setShowAddSimModal(true);
  };

  const handleAddSimModalClose = () => {
    setShowAddSimModal(false);
  };

  const goToPage = (path: string) => {
    router.push(path);
  };

  const handleAddTextboxButtonClick = () => {
    const newTextbox = getNewTextbox();
    onItemAdd(newTextbox, "textboxes");
  };

  let map: any = {};

  const handleKeyDown = (e: any) => {
    map[e.keyCode] = true;
    // Ctrl + Z
    if (map[17] && map[90]) {
      onUndoChange();
    }
    // Ctrl + Y
    if (map[17] && map[89]) {
      onRedoChange();
    }
  };

  const handleKeyUp = (e: any) => {
    map[e.keyCode] = false;
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <>
      {console.log(undoable, redoable)}
      <style>{style}</style>
      <AddSimModal
        showAddSimModal={showAddSimModal}
        handleAddSimModalClose={handleAddSimModalClose}
        onItemAdd={onItemAdd}
      />
      <TopBar
        actions={{
          handleAddSimButtonClick,
          goToPage,
          handleAddTextboxButtonClick,
          handleUndoButtonClick: onUndoChange,
          handleRedoButtonClick: onRedoChange,
        }}
        actionDisablers={{
          undoable,
          redoable,
        }}
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
    onCanvasUpdate: (fabricObjects: string | null) => {
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
    onUndoChange: () => {
      dispatch(ActionCreators.undo());
    },
    onRedoChange: () => {
      dispatch(ActionCreators.redo());
    },
  };
};

const mapStateToProps = (state: any): WorkbookProps => {
  return {
    curSlide: state.present.curSlide,
    slides: state.present.slides,
    undoable: state.past.length !== 0,
    redoable: state.future.length !== 0,
  };
};

const style = `
  .workbook-container {
    width:100vw;
    height:calc(100vh - 46px);
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

const getNewTextbox = (): TextboxType => {
  return {
    text: "",
    position: {
      x: 20,
      y: 20,
    },
    size: {
      width: "400px",
      height: "200px",
    },
  };
};

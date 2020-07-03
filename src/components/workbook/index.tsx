import * as actions from "../../redux/actions/workbook";
import Slide from "./slide";
import { SlideType } from "../../types";
import LeftMenu from "./left-menu";
import TopBar from "./top-menu";
import AddSimModal from "./modals/AddSimModal";
import ThemeContext from "../../contexts/index";
import {
  findIfItsPossibleToReduceCanvasSize,
  getNewTextbox,
} from "../../utils/workbook";

import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useContext } from "react";
import { useRouter } from "next/router";
import { ActionCreators } from "redux-undo";

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
  onPageCountChange(count: number): void;
  onCanvasOptionChange(option: string, value: any): void;
  onClearSlide(): void;
  onFinishReorder(startIndex: number, endIndex: number): void;
  setSlides(slides: Array<SlideType>): void;
  updateWorkbook(values: any): Promise<any>;
}

interface WorkbookProps {
  curSlide: number;
  slides: Array<SlideType>;
  undoable: boolean;
  redoable: boolean;
  canvasOptions: any;
  initialSlides: Array<SlideType>;
  _id: string;
}

type Props = WorkbookMethods & WorkbookProps;

const canvasSize = { width: 1366, height: 720, extraPageSize: 300 };

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
    onPageCountChange,
    canvasOptions,
    onCanvasOptionChange,
    onClearSlide,
    onFinishReorder,
    initialSlides,
    setSlides,
    updateWorkbook,
    _id,
  } = props;

  const noOfSlides = slides.length;
  const [showAddSimModal, setShowAddSimModal] = useState(false);
  const router = useRouter();
  const [scaleX, setScaleX] = useState(1);
  const [canCanvasSizeBeReduced, setCanCanvasSizeBeReduced] = useState(false);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setInitialState();
    return addKeyDownEventListeners();
  }, []);

  useEffect(() => {
    setCanvasScale();
    return addScaleCanvasOnResizeEventListener();
  }, []);

  useEffect(() => {
    let canCanvasSizeBeReduced = findIfItsPossibleToReduceCanvasSize(
      // As we add more items, they need to be included here
      [...slides[curSlide].sims, ...slides[curSlide].textboxes],
      slides[curSlide].pageCount,
      //@ts-ignore
      parseInt(document.querySelector(".upper-canvas").style.height),
      canvasSize.extraPageSize
    );
    setCanCanvasSizeBeReduced(canCanvasSizeBeReduced);
  }, [slides[curSlide]]);

  const setInitialState = () => {
    if (initialSlides) {
      setSlides(initialSlides);
    }
  };

  const saveWorkbook = async () => {
    await updateWorkbook({
      _id,
      field: "slides",
      value: JSON.stringify(JSON.stringify(slides)),
    });
    alert("Saved successfully");
  };

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

  const addKeyDownEventListeners = () => {
    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
    return () => {
      document.onkeydown = null;
      document.onkeyup = null;
    };
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

  const addScaleCanvasOnResizeEventListener = () => {
    window.onresize = setCanvasScale;
    return () => {
      window.onresize = null;
    };
  };

  const setCanvasScale = () => {
    const scaleX =
      document.getElementsByClassName("slide-container")[0].clientWidth /
      canvasSize.width;
    setScaleX(scaleX);
  };

  return (
    <>
      <style>{getStyle({ scaleX, ...theme })}</style>
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
          onPageCountChange,
          onCanvasOptionChange,
          onClearSlide,
          saveWorkbook,
        }}
        actionDisablers={{
          undoable,
          redoable,
          canCanvasSizeBeReduced,
        }}
        canvasOptions={canvasOptions}
      />
      <div className="workbook-container">
        <div className="left-menu-container">
          <LeftMenu
            onAddSlideButtonClick={onAddSlideButtonClick}
            onSlideButtonClick={onSlideButtonClick}
            onDeleteSlideButtonClick={onDeleteSlideButtonClick}
            curSlide={curSlide}
            noOfSlides={noOfSlides}
            onFinishReorder={onFinishReorder}
          />
        </div>
        <div className="scroll-container">
          <div className="slide-container">
            <Slide
              onCanvasUpdate={onCanvasUpdate}
              onItemUpdate={onItemUpdate}
              onItemDelete={onItemDelete}
              slideContents={slides[curSlide]}
              scaleX={scaleX}
              canvasSize={canvasSize}
              canvasOptions={canvasOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Function): any => {
  return {
    onAddSlideButtonClick: () => {
      dispatch(actions.addSlide());
    },
    onDeleteSlideButtonClick: (index: number) => {
      dispatch(actions.deleteSlide(index));
    },
    onSlideButtonClick: (slideNo: number) => {
      dispatch(actions.changeCurSlide(slideNo));
    },
    onCanvasUpdate: (fabricObjects: string | null) => {
      dispatch(actions.setFabricObjectsInCurSlide(fabricObjects));
    },
    onItemAdd: (newItem: any, itemType: string) => {
      dispatch(actions.addItemInCurSlide(newItem, itemType));
    },
    onItemUpdate: (updatedItem: any, index: number, itemType: string) => {
      dispatch(actions.updateItemInCurSlide(updatedItem, index, itemType));
    },
    onItemDelete: (deleteIndex: number, itemType: string) => {
      dispatch(actions.deleteItemInCurSlide(deleteIndex, itemType));
    },
    onUndoChange: () => {
      dispatch(ActionCreators.undo());
    },
    onRedoChange: () => {
      dispatch(ActionCreators.redo());
    },
    onPageCountChange: (count: number) => {
      dispatch(actions.changePageCountInCurSlide(count));
    },
    onCanvasOptionChange: (option: string, value: any) => {
      dispatch(actions.changeCanvasOption(option, value));
    },
    onClearSlide: () => {
      dispatch(actions.clearSlide());
    },
    onFinishReorder: (startIndex: number, endIndex: number) => {
      dispatch(actions.reorderSlides(startIndex, endIndex));
    },
    setSlides: (slides: Array<SlideType>) => {
      dispatch(actions.setSlides(slides));
    },
  };
};

const mapStateToProps = (state: any): any => {
  return {
    curSlide: state.present.curSlide,
    slides: state.present.slides,
    undoable: state.past.length !== 0,
    redoable: state.future.length !== 0,
    canvasOptions: state.present.canvasOptions,
  };
};

const getStyle = (props: any) => `
  .workbook-container {
    width:100vw;
    height:calc(100vh - 46px);
    display:flex;
    flex-direction:row;
    max-width:100%;
    background-color:${props.color3};
  }
  .slide-container {
    max-height:100%;
  }
  .left-menu-container {
    flex:2;
  }
  .scroll-container {
    flex:16;
    overflow-y:auto;
  }
`;

export default connect(mapStateToProps, mapDispatchToProps)(Workbook);

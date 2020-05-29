import SlideList from "./SlideList";
import AddSlide from "./AddSlide";
import ThemeContext from "../../../contexts";
import { useContext } from "react";

interface Props {
  curSlide: number;
  noOfSlides: number;
  onSlideButtonClick(slideNo: number): void;
  onDeleteSlideButtonClick(slideNo: number): void;
  onAddSlideButtonClick(): void;
}

const LeftMenu = ({
  curSlide,
  noOfSlides,
  onSlideButtonClick,
  onDeleteSlideButtonClick,
  onAddSlideButtonClick,
}: Props) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      <style>{getStyle(darkTheme)}</style>
      <div className="left-menu">
        <h1>{curSlide}</h1>
        <AddSlide onClick={onAddSlideButtonClick} />
        <SlideList
          noOfSlides={noOfSlides}
          onSlideButtonClick={onSlideButtonClick}
          onDeleteSlideButtonClick={onDeleteSlideButtonClick}
          curSlide={curSlide}
        />
      </div>
    </>
  );
};

const getStyle = ({ color2 }: any) => `
  .left-menu {
    background-color:${color2};
    padding:1rem;
    overflow-y:auto;
    height:100%;
  }
  .left-menu h1 {
    color:white;
    text-align:center;
  }
`;

export default LeftMenu;

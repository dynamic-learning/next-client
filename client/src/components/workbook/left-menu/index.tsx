import SlideList from "./SlideList";
import AddSlide from "./AddSlide";
import ThemeContext from "../../../contexts";
import { useContext, memo } from "react";

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
  const { theme } = useContext(ThemeContext);

  const Logo = () => (
    <div className="logo-container">
      <img className="logo" src="logo.png" />
    </div>
  );

  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="left-menu">
        <Logo />
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
  .logo {
    width:50px;
    height:50x;
    margin-bottom:0.5rem;
  }
  .logo-container {
    display:flex;
    flex-direction:row;
    justify-content:center;
  }
`;

export default memo(LeftMenu);

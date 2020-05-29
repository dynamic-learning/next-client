import ThemeContext from "../../../contexts";
import { useContext, useState } from "react";
import { FiTrash } from "react-icons/fi";

type Props = {
  slideNo: number;
  onDeleteButtonClick(slideNo: number): void;
  onSlideButtonClick(slideNo: number): void;
  isSlideSelected: boolean;
};

const SlideButton = (props: Props) => {
  const {
    slideNo,
    onDeleteButtonClick,
    onSlideButtonClick,
    isSlideSelected,
  } = props;

  const [isHoveredOnDeleteButton, setIsHoveredOnDeleteButton] = useState(false);
  const [isHoveredOnSlide, setIsHoveredOnSlide] = useState(false);
  const { darkTheme } = useContext(ThemeContext);

  const handleDeleteClick = () => {
    onDeleteButtonClick(slideNo);
  };
  const handleSlideClick = () => {
    if (!isHoveredOnDeleteButton) {
      onSlideButtonClick(slideNo);
    }
  };
  const handleMouseEnterDeleteButton = () => {
    setIsHoveredOnDeleteButton(true);
  };
  const handleMouseLeaveDeleteButton = () => {
    setIsHoveredOnDeleteButton(false);
  };

  const handleMouseEnterSlide = () => {
    setIsHoveredOnSlide(true);
  };
  const handleMouseLeaveSlide = () => {
    setIsHoveredOnSlide(false);
  };

  // CSS classes selected conditionally
  const isSelected = isSlideSelected ? "slide-selected" : "";
  const isDeleteButtonVisible = isHoveredOnSlide
    ? "delete-button-visible"
    : "delete-button-hidden";

  return (
    <div>
      <style>{getStyle(darkTheme)}</style>
      <div
        onMouseEnter={handleMouseEnterSlide}
        onMouseLeave={handleMouseLeaveSlide}
        onClick={handleSlideClick}
        className={`slide-button-container ${isSelected}`}
      >
        <div>Slide {slideNo + 1}</div>
        <div
          className="slide-delete-button"
          onMouseLeave={handleMouseLeaveDeleteButton}
          onMouseEnter={handleMouseEnterDeleteButton}
          onClick={handleDeleteClick}
        >
          <FiTrash className={isDeleteButtonVisible} size={16} />
        </div>
      </div>
    </div>
  );
};

const getStyle = ({ color1, color3, color4, color6 }: any) => `
  .slide-button-container {
    display:flex;
    flex-direction:row;
    border:1px solid ${color4};
    cursor:pointer;
    justify-content:space-between;
    margin-bottom:0.5rem;
    padding:0.5rem;
    color:${color4};
  }
  .slide-button-container:hover {
    background-color:${color3};
    border:1px solid ${color3};
    color:${color6};
  }
  .slide-selected {
    color:${color1};
    background-color:${color3};
  }
  .delete-button-visible {
    visibility:visible;
    color:${color4};
  }
  .delete-button-hidden {
    visibility:hidden;
  }
  .delete-button-visible:hover {
    color:${color1}
  }
  .slide-delete-button {
    display:flex;
    flex-direction:column;
    justify-content:center;
  }
`;

export default SlideButton;

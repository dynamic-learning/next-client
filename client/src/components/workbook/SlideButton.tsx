type Props = {
  slideNo: number;
  onDeleteButtonClick(slideNo: number): void;
  onSlideButtonClick(slideNo: number): void;
};

const SlideButton = (props: Props) => {
  const { slideNo, onDeleteButtonClick, onSlideButtonClick } = props;
  const handleDeleteClick = () => {
    onDeleteButtonClick(slideNo);
  };
  const handleSlideClick = () => {
    onSlideButtonClick(slideNo);
  };
  return (
    <div>
      <button onClick={handleSlideClick}>{slideNo}</button>
      <button onClick={handleDeleteClick}>X</button>
    </div>
  );
};

export default SlideButton;

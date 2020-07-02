import { RiAddCircleLine } from "react-icons/ri";
import ThemeContext from "../../../contexts";
import { useContext } from "react";

interface Props {
  onClick(): void;
}

const AddSlide = ({ onClick }: Props) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="add-button" onClick={onClick}>
        <RiAddCircleLine size={20} className="add-icon" />
      </div>
    </>
  );
};

const getStyle = ({ color4, color5 }: any) => `
.add-button {
    text-align:center;
    margin-bottom:1rem;
    background-color: ${color4};
    padding:0.3rem;
    cursor:pointer;
    display:flex;
    vertical-align:center;
  }
  .add-button:hover {
    background-color: ${color5};
  }
  .add-icon {
    margin:0 auto;
  }
`;

export default AddSlide;

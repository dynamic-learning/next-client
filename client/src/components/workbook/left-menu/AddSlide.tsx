import { PlusCircleOutlined } from "@ant-design/icons";
import ThemeContext from "../../../contexts";
import { useContext } from "react";

interface Props {
  onClick():void
}

const AddSlide = ({ onClick }: Props) => {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      <style>{getStyle(darkTheme)}</style>
      <div className="add-button" onClick={onClick}>
        <PlusCircleOutlined size={20} className="add-icon" />
      </div>
    </>
  );
};

const getStyle = ({ color4, color5 }: any) => `
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

export default AddSlide;

import { AiFillFileAdd, AiFillFolderAdd } from "react-icons/ai";
import ThemeContext from "../../../contexts";
import { useContext } from "react";

export default (props: any) => {
  const { handleAddFileClick, handleAddFolderClick } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="file-folder-add-icons-container">
        <AiFillFileAdd
          size={22}
          className="file-add-icon hover-green"
          onClick={handleAddFileClick}
        />
        <AiFillFolderAdd
          size={25}
          className="folder-add-icon hover-green"
          onClick={handleAddFolderClick}
        />
      </div>
    </>
  );
};

const getStyle = ({ color2, color1 }: any) => `
  .file-folder-add-icons-container {
    padding:0.8rem;
    background-color:${color2};
  }
  .file-add-icon {
    cursor:pointer;
    color:white;
  }
  .folder-add-icon {
    color:white;
    cursor:pointer;
    margin-left:0.3rem;
    position:relative;
    top:0.2rem;
  }
  .hover-green:hover {
    color:${color1};
  }
`;

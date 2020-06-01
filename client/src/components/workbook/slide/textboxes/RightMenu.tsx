import { IoMdMove } from "react-icons/io";
import { MdSignalCellular4Bar } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { TextboxType } from "../../../../types";
import { rightMenuCommonStyles } from "../common/styles";

interface Props {
  onItemDelete(deleteIndex: number, itemType: string): void;
  index: number;
  textbox: TextboxType;
}

const RightMenu = (props: Props) => {
  const { onItemDelete, index } = props;
  const handleDeleteClick = () => {
    onItemDelete(index, "textboxes");
  };
  return (
    <>
      <style>{style}</style>
      <div className="right-menu">
        <div className="right-top-menu">
          <AiOutlineClose
            onClick={handleDeleteClick}
            className="icon texbox-delete-button"
          />
          <IoMdMove className="icon dragHandle" />
        </div>
        <div className="resize-handle">
          <MdSignalCellular4Bar />
        </div>
      </div>
    </>
  );
};

const style = `
  ${rightMenuCommonStyles}
`;

export default RightMenu;

import { FaCode } from "react-icons/fa";
import { IoMdMove } from "react-icons/io";
import { MdSignalCellular4Bar } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { CanvasSimType } from "../../../../types";
import { rightMenuCommonStyles } from "../common/styles";

interface Props {
  onItemDelete(deleteIndex: number, itemType: string): void;
  index: number;
  sim: CanvasSimType;
}

const RightMenu = (props: Props) => {
  const { onItemDelete, index, sim } = props;
  const handleDeleteClick = () => {
    onItemDelete(index, "sims");
  };
  const { owner, id } = sim;
  return (
    <>
      <style>{style}</style>
      <div className="right-menu">
        <div className="right-top-menu">
          <AiOutlineClose onClick={handleDeleteClick} className="icon" />
          <a
            target="blank"
            className="link"
            href={`https://editor.p5js.org/${owner}/sketches/${id}`}
          >
            <FaCode className="icon" />
          </a>
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
    .link  {
      color: inherit;
      transition: none !important;
    }
    .link:hover  {
      color: white;
    }
    ${rightMenuCommonStyles}
  `;

export default RightMenu;

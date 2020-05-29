import { FaCode } from "react-icons/fa";
import { IoMdMove } from "react-icons/io";
import { MdSignalCellular4Bar } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { CanvasSimType } from "../../../../types";

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
    .right-menu {
      color:black;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
    }
    .right-menu:hover {
      color:grey;
    }
    .right-top-menu {
      display:flex;
      flex-direction:column;
      margin-left:0.5rem;
    }
    .icon {
      font-size:1.2rem;
      margin-bottom:0.3rem; 
      cursor:pointer;
    }
    .icon:hover {
      color:white;
    }
    .resize-handle svg {
      position:fixed;
      right:0;
      bottom:0;
    }
  `;

export default RightMenu;

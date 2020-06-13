import { TextboxType } from "../../../../types";
import MoveAndResize from "../common/MoveAndResize";
import Textbox from "./Textbox";
import RightMenu from "./RightMenu";

type Props = {
  textboxes: Array<TextboxType>;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
  setIsTransforming(isTransforming: boolean): void;
  isTransforming: boolean;
  scaleX: number;
};

const Textboxes = (props: Props) => {
  const {
    textboxes,
    setIsTransforming,
    onItemUpdate,
    onItemDelete,
    scaleX,
  } = props;

  return (
    <>
      <style>{style}</style>
      {textboxes.map((textbox, index) => (
        <MoveAndResize
          setIsTransforming={setIsTransforming}
          onItemUpdate={onItemUpdate}
          index={index}
          item={textbox}
          type="textboxes"
          scaleX={scaleX}
          key={index}
        >
          <div className="text-box-and-menu">
            <Textbox
              index={index}
              onItemUpdate={onItemUpdate}
              textbox={textbox}
            />
            <RightMenu
              index={index}
              textbox={textbox}
              onItemDelete={onItemDelete}
            />
          </div>
        </MoveAndResize>
      ))}
    </>
  );
};

const style = `
.text-box-and-menu {
    display:flex;
    flex-direction:row;
}
`;

export default Textboxes;

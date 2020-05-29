import { CanvasSimType } from "../../../../types";
import MoveAndResize from "../MoveAndResize";
import Sim from "./Sim";
import RightMenu from "./RightMenu";

interface Props {
  sims: Array<CanvasSimType>;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
  setIsTransforming(isTransforming: boolean): void;
  isTransforming: boolean;
}

const Sims = (props: Props) => {
  const {
    sims,
    onItemUpdate,
    onItemDelete,
    setIsTransforming,
    isTransforming,
  } = props;

  return (
    <div>
      <style>{style}</style>
      {sims.map((sim, index) => (
        <MoveAndResize
          setIsTransforming={setIsTransforming}
          onItemUpdate={onItemUpdate}
          item={sim}
          index={index}
        >
          <div className="sim-and-menu">
            <Sim isTransforming={isTransforming} sim={sim} />
            <RightMenu sim={sim} index={index} onItemDelete={onItemDelete} />
          </div>
        </MoveAndResize>
      ))}
    </div>
  );
};

const style = `
.sim-and-menu {
  display:flex;
  flex-direction:row;
}
`;

export default Sims;

import { CanvasSimType } from "../../../../types";
import MoveAndResize from "../common/MoveAndResize";
import Sim from "./Sim";
import RightMenu from "./RightMenu";

interface Props {
  sims: Array<CanvasSimType>;
  onItemUpdate(updatedItem: any, index: number, itemType: string): void;
  onItemDelete(deleteIndex: number, itemType: string): void;
  setIsTransforming(isTransforming: boolean): void;
  isTransforming: boolean;
  scaleX: number;
}

const Sims = (props: Props) => {
  const {
    sims,
    onItemUpdate,
    onItemDelete,
    setIsTransforming,
    isTransforming,
    scaleX,
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
          type="sims"
          scaleX={scaleX}
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

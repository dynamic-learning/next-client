import LeftMenu from "./menu/LeftMenu";
import SimSearchAdd from "./sim-search-add";
import SimsList from "./sims-list/SimsList";
import { useState } from "react";
import AddSimModal from "./sims-list/AddSimModal";
import { updateItemInArrayAtIndex } from "../../utils/array";

const defaultSims: Array<any> = [];

interface Props {
  addSim: ({ _id, owner, title, description, tags, imageURL }: any) => Promise<any>;
  editSim: ({ id, updatedSim }: any) => Promise<any>;
  deleteSim: (id: any) => Promise<any>;
}

const Simulations = (props: Props) => {
  const { addSim, editSim, deleteSim }= props;
  const [sims, updateSims] = useState(defaultSims);
  const [loading, setLoading]= useState(false);
  const [showAddSim, setShowAddSim] = useState(false);

  const handleAddClick = () => {
    setShowAddSim(true);
  };

  const handleAddSimClose = () => {
    setShowAddSim(false);
  };

  const onSimAdd = (newSim: any) => {
    updateSims([...sims, newSim]);
    addSim(newSim)
  };

  const updateSim = async (updatedSim: any) => {
    setLoading(true);
    const indexOfUpdatedSim = sims.findIndex(
      (sim: any) => updatedSim.id === sim.id
    );
    updateSims(updateItemInArrayAtIndex(sims, indexOfUpdatedSim, updatedSim));
    await editSim(updatedSim)

    setLoading(false);
  };

  return (
    <>
      <style>{style}</style>
      <AddSimModal
        onSimAdd={onSimAdd}
        handleAddSimClose={handleAddSimClose}
        visible={showAddSim}
      />
      <div className={`page-container  ${loading? "loading" :null}`}>
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="sims-list">
          <SimSearchAdd handleAddClick={handleAddClick} />
          <SimsList updateSim={updateSim} deleteSim={deleteSim} sims={sims} />
        </div>
      </div>
    </>
  );
};

const style = `
    .left-menu {
        flex:2;
        height:100%;
    }   
    .sims-list {
        flex:10;
    }
    .page-container {
        width:100vw;
        display:flex;
        flex-direction:row;
        height:100vh;
    }
    .loading {
      opacity: 0.3;
      background-color: black;
      pointer-events:none;
    }
`;

export default Simulations;

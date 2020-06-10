import LeftMenu from "./menu/LeftMenu";
import SimSearchAdd from "./sim-search-add";
import SimsList from "./sims-list/SimsList";
import { useState } from "react";
import AddSimModal from "./sims-list/AddSimModal";
import { updateItemInArrayAtIndex } from "../../utils/array";

const defaultSims: Array<any> = [];

const Simulations = () => {
  const [sims, updateSims] = useState(defaultSims);
  const [showAddSim, setShowAddSim] = useState(false);

  const handleAddClick = () => {
    setShowAddSim(true);
  };

  const handleAddSimClose = () => {
    setShowAddSim(false);
  };

  const onSimAdd = (newSim: any) => {
    updateSims([...sims, newSim]);
  };

  const updateSim = (updatedSim: any) => {
    const indexOfUpdatedSim = sims.findIndex(
      (sim: any) => updatedSim.id === sim.id
    );
    updateSims(updateItemInArrayAtIndex(sims, indexOfUpdatedSim, updatedSim));
  };

  return (
    <>
      <AddSimModal
        onSimAdd={onSimAdd}
        handleAddSimClose={handleAddSimClose}
        visible={showAddSim}
      />
      <style>{style}</style>
      <div className="page-container">
        <div className="left-menu">
          <LeftMenu />
        </div>
        <div className="sims-list">
          <SimSearchAdd handleAddClick={handleAddClick} />
          <SimsList updateSim={updateSim} sims={sims} />
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
`;

export default Simulations;

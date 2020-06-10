import P5SimModal from "../../common/P5SimModal";
import { useState } from "react";
import SimDetails from "./SimDetails";
import SimDetailsEditable from "./SimDetailsEditable";

let defaultSim: any;

defaultSim = null;

interface Props {
  sims: Array<any>;
  updateSim(updatedSim: any): void;
}

const SimsList = (props: Props) => {
  const { sims, updateSim } = props;

  const [selectedSim, setSelectedSim] = useState(defaultSim);

  const handleSimClick = (index: number) => {
    return () => {
      setSelectedSim(sims[index]);
    };
  };

  const updateSelectedSim = (editedValue: string, valueType: string) => {
    setSelectedSim({
      ...selectedSim,
      [valueType]: editedValue,
    });
  };

  const handleOKClick = () => {
    updateSim(selectedSim);
    setSelectedSim(null);
  };

  const handleApplyClick = () => {
    updateSim(selectedSim);
    setSelectedSim(null);
  };

  const handleCancelClick = () => {
    setSelectedSim(null);
  };

  const isAdmin = true;

  const SimsList = () => (
    <>
      {sims.map((sim: any, index: number) => (
        <li key={sim.id} onClick={handleSimClick(index)} className="flex-item">
          {sim.title}
        </li>
      ))}
    </>
  );

  return (
    <>
      <style>{style}</style>
      {selectedSim ? (
        <P5SimModal
          onCancel={handleCancelClick}
          onOk={handleOKClick}
          centered
          title="Sim"
          sim={selectedSim}
          visible={!!selectedSim}
        >
          {isAdmin ? (
            <SimDetailsEditable
              selectedSim={selectedSim}
              updateSelectedSim={updateSelectedSim}
              handleApplyClick={handleApplyClick}
            />
          ) : (
            <SimDetails selectedSim={selectedSim} />
          )}
        </P5SimModal>
      ) : null}

      <ul className="flex-container wrap">
        <SimsList />
      </ul>
    </>
  );
};

const style = `
    .flex-container {
        list-style: none;
        padding:0;
        margin:0;
        display: flex;
    }
    .flex-item {
        background-color:lightblue;
        width: 100px;
        height: 100px;
        margin: 1rem;
        
        line-height: 100px;
        color: black;
        font-size: 1rem;
        text-align: center;
        cursor:pointer;
    }
    .flex-item:hover {
        background-color:#1890ff;
    }
    .wrap    { 
        flex-wrap: wrap;
    }  
`;

export default SimsList;
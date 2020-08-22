import P5SimModal from "../../common/P5SimModal";
import { useState } from "react";
import SimDetails from "./SimDetails";
import SimDetailsEditable from "./SimDetailsEditable";
import { Button, Card, Spin } from "antd";
import { DeleteOutlined, SaveOutlined, PlusCircleOutlined } from '@ant-design/icons';

const defaultSim: any = null

interface Props {
  sims: Array<any>;
  onSimUpdate(updatedSim: any): void;
  onSimDelete: (deletedSim: any) => void;
  loading: any;
}

const SimsList = (props: Props) => {
  const { sims, onSimUpdate, onSimDelete, loading } = props;

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
    onSimUpdate(selectedSim);
    setSelectedSim(null);
  };

  const handleApplyClick = () => {
    onSimUpdate(selectedSim);
    setSelectedSim(null);
  };

  const handleCancelClick = () => {
    setSelectedSim(null);
  };

  const deleteSelectedSim= () => {
    onSimDelete(selectedSim);
    setSelectedSim(null);
  }

  const isAdmin = () => {
    return true;
  };

  const handleAddToWorkbook = () => {
    //TODO: Need to implement this later   
    console.log('add sim to workbook');
  }

  const footerArray = () => {
    if (isAdmin()) {
      return [        
        <Button onClick={deleteSelectedSim} icon={<DeleteOutlined />} type="dashed" danger>
          Delete 
        </Button>,
        <Button icon={<SaveOutlined />} onClick={handleOKClick}>
          Save
        </Button>,
        <Button icon={<PlusCircleOutlined />} onClick={handleAddToWorkbook}>
          Add 
        </Button>
      ]
    }
    else {
      return [
        <Button icon={<PlusCircleOutlined />} onClick={handleAddToWorkbook}>
          Add to workbook
        </Button>
      ];
    }
  }

  const SimsList = () => (
    <>
      {sims.map((sim: any, index: number) => (
        <Card
        style={{ width: "200px", margin: " 20px" }}
        onClick={handleSimClick(index)}
        hoverable={true}
        cover={
          <img
            alt="example"
            src={sim.imageURL}
            style = {{height: "200px", width: "198px", margin: "0px auto"}}            
            className="sim-block"
            key={sim._id}
          />
        }
      >
        <h2>{sim.title}</h2>
        <div style={{margin: "5px 0px", color: "grey"}}>{sim.description}</div>
      </Card>
      ))}
    </>
  );
  console.log(selectedSim);
  return (
    <>
      <style>{style}</style>
      {selectedSim ? (
        <P5SimModal
          centered
          title="Sim"
          sim={selectedSim}
          deleteSelectedSim={deleteSelectedSim}
          visible={!!selectedSim}
          footer={footerArray()}
        >
          {isAdmin() ? (
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
      {
        (loading)
          ? <Spin className="no-simulation-found" size="large" />
          : (
              sims.length === 0 ?
                <div className="no-simulation-found">
                  No simulations found
                </div>
              :
                <ul className="flex-container wrap">
                  <SimsList />
                </ul>
          )
      }
    </>
  );
};

const style = `
    .no-simulation-found {
      margin: 0 auto;
      display: flex;
      height: 75%;
      width: fit-content;
      flex-direction: row;
      align-items: center;
    }
    .flex-container {
        list-style: none;
        padding:0;
        margin:0;
        display: flex;
    }
    .sim-block {
        padding:5px;
        width: 100px;
        height: 100px;
        margin: 1rem;
        cursor:pointer;
        border:1px solid lightgrey;
    }
    .flex-item:hover {
        background-color:#1890ff;
    }
    .wrap { 
        flex-wrap: wrap;
    }  
`;

export default SimsList;

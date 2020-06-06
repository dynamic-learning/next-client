import { Modal } from "antd";
import AddSim from "./modal-contents/AddSim";
import { useState } from "react";
import { getNewSim } from "../../../utils/workbook";

interface Props {
  showAddSimModal: boolean;
  handleAddSimModalClose(): void;
  onItemAdd(newItem: any, itemType: string): void;
}

const AddSimModal = (props: Props) => {
  const [sim, setSim] = useState({ owner: "", id: "" });
  const { showAddSimModal, handleAddSimModalClose, onItemAdd } = props;

  const handleOk = () => {
    handleAddSimModalClose();
    const { owner, id } = sim;
    if (owner && id) {
      const newSim = getNewSim(owner, id);
      onItemAdd(newSim, "sims");
    }
  };

  const getSim = (sim: any) => {
    setSim(sim);
  };

  return (
    <>
      <style>{style}</style>
      <Modal
        destroyOnClose
        onOk={handleOk}
        okText="Add"
        wrapClassName="vertical-center-modal"
        width={692}
        onCancel={handleAddSimModalClose}
        title="Add simulation"
        visible={showAddSimModal}
      >
        <AddSim getSim={getSim} />
      </Modal>
    </>
  );
};

const style = `
    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .vertical-center-modal .ant-modal {
        top: 0;
    }
`;

export default AddSimModal;

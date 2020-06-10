import P5SketchUrlInput from "../../common/P5SketchUrlInput";
import { useState } from "react";
import { getNewSim } from "../../../utils/workbook";
import P5SimModal from "../../common/P5SimModal";
import { Sim } from "../../../types";

interface Props {
  showAddSimModal: boolean;
  handleAddSimModalClose(): void;
  onItemAdd(newItem: any, itemType: string): void;
}

const defaultSim: any = { owner: "", id: "" };

const AddSimModal = (props: Props) => {
  const [sim, setSim] = useState(defaultSim);
  const { showAddSimModal, handleAddSimModalClose, onItemAdd } = props;

  const handleOk = () => {
    handleAddSimModalClose();
    //@ts-ignore
    const { owner, id } = sim;
    if (owner && id) {
      const newSim = getNewSim(owner, id);
      onItemAdd(newSim, "sims");
    }
  };

  return (
    <>
      <style>{style}</style>
      <P5SimModal
        destroyOnClose
        onOK={handleOk}
        okText="Add"
        wrapClassName="vertical-center-modal"
        onCancel={handleAddSimModalClose}
        title="Add simulation"
        visible={showAddSimModal}
        sim={sim}
        maskClosable={false}
      >
        <P5SketchUrlInput setSim={setSim} />
      </P5SimModal>
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

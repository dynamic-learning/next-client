import P5SketchUrlInput from "../../common/P5SketchUrlInput";
import { useState } from "react";
import { getNewSim } from "../../../utils/workbook";
import P5SimModal from "../../common/P5SimModal";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

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
    console.log("Adding item: handleOk");
    const { owner, _id } = sim;
    console.log(owner, _id);
    if (owner && _id) {
      const newSim = getNewSim(owner, _id);
      console.log("Adding item");
      onItemAdd(newSim, "sims");
    }
  };

  const handleCancel = () => {
    setSim(null);
    handleAddSimModalClose();
  };

  const footerArray = [
    <Button icon={<PlusCircleOutlined />} onClick={handleOk}>
      Add to workbook
    </Button>,
  ];

  return (
    <>
      <style>{style}</style>
      <P5SimModal
        destroyOnClose
        wrapClassName="vertical-center-modal"
        handleModalClose={handleCancel}
        title="Add simulation"
        visible={showAddSimModal}
        sim={sim}
        maskClosable={false}
        footer={footerArray}
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

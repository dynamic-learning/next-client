import { Modal, Input } from "antd";

interface Props {
  visible: boolean;
  handleClose(): void;
  titleInModal: string;
  setTitleInModal(name: string): void;
  handleOK(): void;
}

const TitleModal = (props: Props) => {
  const {
    visible,
    handleClose,
    titleInModal,
    setTitleInModal,
    handleOK,
  } = props;

  const handleChange = (e: any) => {
    setTitleInModal(e.target.value);
  };

  return (
    <Modal
      onOk={handleOK}
      onCancel={handleClose}
      visible={visible}
      title="Enter the title"
    >
      <Input onChange={handleChange} value={titleInModal} />
    </Modal>
  );
};

export default TitleModal;

import P5SketchUrlInput from "../../common/P5SketchUrlInput";
import { useState } from "react";
import { Input } from "antd";
import ReactTags from "react-tag-autocomplete";
import P5SimModal from "../../common/P5SimModal";

const { TextArea } = Input;

const defaultTags: Array<any> = [];

interface Props {
  visible: boolean;
  handleAddSimClose(): void;
  onSimAdd(sim: any): void;
}

const defaultSim: any = null;

const AddSimModal = (props: Props) => {
  const { visible, handleAddSimClose, onSimAdd } = props;

  const [sim, setSim] = useState(defaultSim);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(defaultTags);

  const onTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const onDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleDeleteTag = (i: any) => {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleAddTag = (tag: any) => {
    if (!tags.includes(tag.name)) {
      setTags([...tags, tag.name]);
    }
  };

  const clearFieldsAndCloseModal = () => {
    setSim(null);
    handleAddSimClose();
    setTitle("");
    setDescription("");
    setTags([]);
  };

  const onSubmitPress = () => {
    const simObject = {
      ...sim,
      title,
      description,
      tags,
    };
    onSimAdd(simObject);
    clearFieldsAndCloseModal();
  };

  const isTitleOrDescriptionMissing = !(title && description);

  return (
    <>
      <style>{style}</style>
      <P5SimModal
        sim={sim}
        centered
        destroyOnClose
        onCancel={clearFieldsAndCloseModal}
        onOk={onSubmitPress}
        visible={visible}
        title="Add simulation"
        okButtonProps={{ disabled: isTitleOrDescriptionMissing }}
      >
        <P5SketchUrlInput setSim={setSim} />
        {sim ? (
          <>
            <Input
              onChange={onTitleChange}
              value={title}
              className="detail"
              placeholder="Enter title"
            />
            <TextArea
              value={description}
              onChange={onDescriptionChange}
              className="detail"
              placeholder="Enter description"
            />
            <div className="react-tag">
              <ReactTags
                tags={tags.map((tag: string) => ({ id: name, name: tag }))}
                handleDelete={handleDeleteTag}
                handleAddition={handleAddTag}
                allowNew={true}
              />
            </div>
          </>
        ) : null}
      </P5SimModal>
    </>
  );
};

const style = `
  .detail {
    margin-top:1rem;
  }
  .react-tag {
    margin-top:1rem;
  }
`;

export default AddSimModal;

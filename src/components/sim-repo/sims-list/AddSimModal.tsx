import P5SketchUrlInput from "../../common/P5SketchUrlInput";
import { useState } from "react";
import { Input } from "antd";
import ReactTags from "react-tag-autocomplete";
import P5SimModal from "../../common/P5SimModal";
import ImageUpload from "../../common/ImageUpload";
import { Button } from "antd";
import { PlusCircleOutlined } from '@ant-design/icons';

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
  const [imageURL, setImageURL] = useState("");

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
    setImageURL("");
  };

  const onSubmitPress = () => {
    const simObject = {
      ...sim,
      title,
      description,
      tags,
      imageURL,
    };
    onSimAdd(simObject);
    clearFieldsAndCloseModal();
  };

  const areAllDetailsFilled = !(
    title &&
    description &&
    imageURL &&
    tags.length > 0
  );

  const footerArray = [
    <Button icon={<PlusCircleOutlined />} onClick={onSubmitPress}>
      Add sim
    </Button>
  ];

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
        okButtonProps={{ disabled: areAllDetailsFilled }}
        footer={footerArray}
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
            <div className="details-and-image">
              <div className="details">
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
              </div>
              <div className="img-upld">
                <ImageUpload imageURL={imageURL} setImageURL={setImageURL} />
              </div>
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
  .details-and-image {
    display: flex;
    flex-direction:row;
    justify-content:space-between;
  }
  .details {
    flex:8;
  }
  .img-upld {
    margin:1rem;
    flex:2;
    margin-right:0;
    max-width:102px;
  }
  .ant-upload ant-upload-select ant-upload-select-picture-card {
    margin:0;
  }
`;

export default AddSimModal;

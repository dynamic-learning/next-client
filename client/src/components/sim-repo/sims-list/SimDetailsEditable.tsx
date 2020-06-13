import { Divider, Input, Button } from "antd";
import EditableElement from "../../common/EditableElement";
import ReactTags from "react-tag-autocomplete";
import ImageUpload from "../../common/ImageUpload";

const { TextArea } = Input;

interface Props {
  selectedSim: any;
  updateSelectedSim(updatedSim: any, updatedValueType: string): void;
  handleApplyClick(): void;
}

const SimDetails = (props: Props) => {
  const { selectedSim, updateSelectedSim, handleApplyClick } = props;
  const handleDeleteTag = (i: any) => {
    const newTags = selectedSim.tags.slice(0);
    newTags.splice(i, 1);
    updateSelectedSim(newTags, "tags");
  };

  const handleAddTag = (tag: any) => {
    if (!selectedSim.tags.includes(tag.name)) {
      updateSelectedSim([...selectedSim.tags, tag.name], "tags");
    }
  };

  const onTitleEdit = (value: any) => {
    updateSelectedSim(value, "title");
  };

  const onDescriptionEdit = (value: any) => {
    updateSelectedSim(value, "description");
  };

  const setImgUrl = (imgUrl: string) => {
    updateSelectedSim(imgUrl, "imgUrl");
  };

  const Title = () => (
    <EditableElement
      style={{ fontWeight: "bold" }}
      isEditable={true}
      onEdit={onTitleEdit}
      value={selectedSim.title}
      Element={Input}
    />
  );

  const Description = () => (
    <EditableElement
      isEditable={true}
      onEdit={onDescriptionEdit}
      value={selectedSim.description}
      Element={TextArea}
    />
  );

  const Tags = () => (
    <div className="tags">
      <ReactTags
        tags={selectedSim.tags.map((tag: any) => ({ name: tag, id: tag }))}
        handleDelete={handleDeleteTag}
        handleAddition={handleAddTag}
        allowNew={true}
      />
    </div>
  );

  return (
    <>
      <style>{style}</style>
      <div className="sim-detail">
        <Title />
        <Divider />
        <div className="details-and-image">
          <div className="details">
            <Description />
            <Divider />
            <Tags />
            <Divider />
            <div>
              <Button onClick={handleApplyClick}>Apply changes</Button>
              <Button className="delete">Delete Sim</Button>
            </div>
          </div>
          <div className="img">
            <ImageUpload setImgUrl={setImgUrl} imgUrl={selectedSim.imgUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

const style = `
  .ant-divider {
    margin:12px 0;
  }
  .sim-detail {
    margin-top:1rem;
    padding:0.5rem;
  }
  .tags {
    margin-top:1rem;
  }
  .delete {
    margin-left:1rem;
  }
  .details-and-image {
    display:flex;
    flex-direction:row;
  }
  .details {
    flex:8;
  }
  .img {
    flex:2;
    margin:1rem;
    margin-right:0;
    max-width:102px;
  }
`;

export default SimDetails;

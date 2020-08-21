import { Input } from "antd";
import ReactTags from "react-tag-autocomplete";
import ImageUpload from "../../common/ImageUpload";

const { TextArea } = Input;

interface Props {
  selectedSim: any;
  updateSelectedSim(updatedSim: any, updatedValueType: string): void;
  handleApplyClick(): void;
}

const SimDetails = (props: Props) => {
  const { selectedSim, updateSelectedSim } = props;
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

  const onTitleChange = (e: any) => {
    updateSelectedSim(e.target.value, "title");
  };

  const onDescriptionChange = (e: any) => {
    updateSelectedSim(e.target.value, "description");
  };

  const setImageURL = (imageURL: string) => {
    updateSelectedSim(imageURL, "imageURL");
  };

  return (
    <>
      <style>{style}</style>
      <div className="sim-detail">
      <Input
          onChange={onTitleChange}
          value={selectedSim.title}
          className="detail"
          placeholder="Enter title"
        />
        <div className="details-and-image">
          <div className="details">
            <TextArea
              value={selectedSim.description}
              onChange={onDescriptionChange}
              className="detail"
              placeholder="Enter description"
            />
            <div className="react-tag">
              <ReactTags
                tags={selectedSim.tags.map((tag: string) => ({ id: name, name: tag }))}
                handleDelete={handleDeleteTag}
                handleAddition={handleAddTag}
                allowNew={true}
              />
            </div>
          </div>
          <div className="img-upld">
            <ImageUpload setImageURL={setImageURL} imageURL={selectedSim.imageURL} />
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
    background-color:red;
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

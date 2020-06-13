import { Input, Button } from "antd";

const { Search } = Input;

interface Props {
  handleAddClick(sim: any): void;
}

const SimSearchAdd = (props: Props) => {
  const { handleAddClick } = props;

  return (
    <>
      <style>{style}</style>
      <div className="top-bar">
        <div className="search-box">
          <Search
            placeholder="input search text"
            enterButton="Search"
            onSearch={(value) => console.log(value)}
          />
        </div>
        <Button onClick={handleAddClick}>Add Sim</Button>
      </div>
    </>
  );
};

const style = `
    .top-bar {
        padding:1rem;
        display:flex;
        justify-content:space-between;
    }
    .search-box {
      width:40%;
    }
`;

export default SimSearchAdd;

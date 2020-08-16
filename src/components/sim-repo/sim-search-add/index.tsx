import { Input, Button } from "antd";

const { Search } = Input;

interface Props {
  handleAddClick(sim: any): void;
  handleSearch(searchKeyword: string): void;
}

const SimSearchAdd = (props: Props) => {
  const { handleAddClick, handleSearch } = props;

  return (
    <>
      <style>{style}</style>
      <div className="top-bar">
        <div className="search-box">
          {/* <Search
            placeholder="input search text"
            onKeyUp={handleSearch}            
          /> */}
          <Input placeholder="Search simulations" allowClear onChange={(e) => handleSearch(e.target.value)} />
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

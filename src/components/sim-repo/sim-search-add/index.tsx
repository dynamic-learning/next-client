import { Input, Button } from "antd";
import useAuth from "../../../hooks/useAuth";

interface Props {
  handleAddClick(sim: any): void;
  handleSearch(searchKeyword: string): void;
}

const SimSearchAdd = (props: Props) => {
  const { handleAddClick, handleSearch } = props;
  const { isAdmin } = useAuth();

  return (
    <>
      <style>{style}</style>
      <div className="top-bar">
        <div className="search-box">
          <Input
            placeholder="Search simulations"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        {isAdmin ? <Button onClick={handleAddClick}>Add Sim</Button> : null}
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

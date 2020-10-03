import { AiOutlineFolder, AiOutlineFile } from "react-icons/ai";

const WorkbookTitle = ({ node }: any) => (
  <>
    <style>{style}</style>
    <div className="workbook-title-container">
      <div className="left-icon">
        {node.type === "file" ? (
          <AiOutlineFile size={16} />
        ) : (
          <AiOutlineFolder size={17} />
        )}
      </div>
      <div className="workbook-title">{node.title}</div>
    </div>
  </>
);

const style = `
  .workbook-title {
    margin-left:0.4rem;
    margin-top:0.15rem;
  }
  .workbook-title-container {
    display:flex;
    flex-direction:row;
    position:relative;
    top:0.4rem;
  }

  .left-icon {
    margin-top:0.3rem;
  }
`;

export default WorkbookTitle;

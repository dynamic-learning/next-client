import SortableTree from "../sortable-tree";
import { useState } from "react";
import { TreeItem } from "react-sortable-tree";
import { getNewFile, getNewFolder, findIdsOfItemsToDelete } from "./functions";
import { AiOutlineFolder, AiOutlineFile } from "react-icons/ai";
import { FiTrash2, FiEdit3 } from "react-icons/fi";
import AddFileFolder from "./AddFileFolder";
import Header from "./Header";
import { updateItemInArrayAtIndex } from "../../../utils";
import Topbar from "../../top-bar";
import { Menu } from "antd";
import { useRouter } from "next/router";

let emptyList: Array<TreeItem>;

emptyList = [];

const { SubMenu } = Menu;

const Workbooks = () => {
  const [flatData, updateFlatData] = useState(emptyList);

  const [fileCount, setFileCount] = useState(1);
  const [folderCount, setFolderCount] = useState(1);
  const router = useRouter();

  const handleAddFileClick = () => {
    // Replace wih Api call
    const newFile = getNewFile(fileCount);
    setFileCount(fileCount + 1);
    updateFlatData([...flatData, newFile]);
  };

  const handleAddFolderClick = () => {
    // Replace wih Api call
    const newFolder = getNewFolder(folderCount);
    setFolderCount(folderCount + 1);
    updateFlatData([...flatData, newFolder]);
  };

  const handleDeleteClick = (node: TreeItem) => {
    return () => {
      const idsOfItemsToDelete: Array<any> = [];
      findIdsOfItemsToDelete(node, idsOfItemsToDelete);
      // Replace with Api call
      deleteItems(idsOfItemsToDelete);
    };
  };

  const deleteItems = (idsOfItemsToDelete: Array<string>) => {
    const newFlatData = flatData.filter(
      (datum: TreeItem) => !idsOfItemsToDelete.includes(datum.id)
    );

    newFlatData.forEach((d) => {
      delete d.children;
    });

    updateFlatData(newFlatData);
  };

  const onMoveNode = ({ node, nextParentNode }: any) => {
    if (nextParentNode) {
      // Replace with Api call
      changeParentOfNode(node.id, nextParentNode.id);
    } else {
      // Replace with Api call
      changeParentOfNode(node.id, "0");
    }
  };

  const changeParentOfNode = (id: string, newParentId: string) => {
    const indexOfNode = flatData.findIndex(
      (datum: TreeItem) => datum.id === id
    );
    const node = flatData[indexOfNode];
    const newFlatData = updateItemInArrayAtIndex(flatData, indexOfNode, {
      ...node,
      parentId: newParentId,
    });
    updateFlatData(newFlatData);
  };

  const WorkbookTitle = ({ node }: any) => (
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
  );

  const generateNodeProps = ({ node }: any) => {
    return {
      title: <WorkbookTitle node={node} />,
      buttons: [
        <FiEdit3 className="right-icon edit-icon" size={16} />,
        <FiTrash2
          size={16}
          className="right-icon"
          onClick={handleDeleteClick(node)}
        />,
      ],
    };
  };

  const handleGoBackClick = () => router.push("/index");

  const renderGoBack = () => (
    <SubMenu onTitleClick={handleGoBackClick} title="Go back to workbook" />
  );

  return (
    <>
      <style>{style}</style>
      <Topbar>{renderGoBack()}</Topbar>
      <div className="page-container">
        <div className="main-container">
          <Header />
          <div className="tree-container">
            <SortableTree
              flatData={flatData}
              updateFlatData={updateFlatData}
              onMoveNode={onMoveNode}
              getNodeKey={(node: TreeItem) => node.id}
              generateNodeProps={generateNodeProps}
            />
          </div>
          <AddFileFolder
            handleAddFileClick={handleAddFileClick}
            handleAddFolderClick={handleAddFolderClick}
          />
        </div>
      </div>
    </>
  );
};

const style = `
  .main-container {
    width:70%;
    margin:auto;
    margin-top:2rem;
  }
  .tree-container {
    border: 1px solid lightgrey;
  }
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
  .right-icon {
    position:relative;
    top:0.5rem;
    cursor:pointer;
    color:grey;
  }
  .right-icon:hover {
    color:black !important;
  }
  .edit-icon {
    margin-right:0.4rem;
  } 
`;

export default Workbooks;

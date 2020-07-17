/**
 * Libraries
 */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Menu } from "antd";
import { AiOutlineFolder, AiOutlineFile } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import { TreeItem } from "react-sortable-tree";
import { RiEditBoxLine } from "react-icons/ri";
import { MdTitle } from "react-icons/md";

/**
 * Imported scripts
 */
import SortableTree from "../sortable-tree";
import {
  getNewFile,
  getNewFolder,
  findItemsToDelete,
} from "../../../utils/files-and-folders";
import AddFileFolder from "./AddFileFolder";
import Header from "./Header";
import { updateItemInArrayAtIndex } from "../../../utils/array";
import Topbar from "../../top-bar";
import TitleModal from "./TitleModal";
import { deleteWorkbook, deleteWorkbookFolder } from "../../../api/mutations";

const emptyList: Array<TreeItem> = [];
const { SubMenu } = Menu;

interface Props {
  initialWorkbooks: Array<any>;
  addWorkbook(workbookDetails: any): Promise<any>;
  addWorkbookFolder(workbookFolderDetails: any): Promise<any>;
  deleteWorkbook(_id: string): Promise<any>;
  deleteWorkbookFolder(_id: string): Promise<any>;
  updateWorkbook(workbookDetails: any): Promise<any>;
  updateWorkbookFolder(workbookFolderDetails: any): Promise<any>;
}

const Workbooks = (props: Props) => {
  const {
    initialWorkbooks,
    addWorkbook,
    addWorkbookFolder,
    updateWorkbook,
    updateWorkbookFolder,
  } = props;

  const selectedNodeDefault: any = null;

  const [flatData, updateFlatData] = useState(emptyList);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [titleInModal, setTitleInModal] = useState("");
  const [currentMode, setCurrentMode] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedNode, setSelectedNode] = useState(selectedNodeDefault);

  const router = useRouter();

  useEffect(() => {
    updateFlatData(initialWorkbooks);
  }, []);

  ////////////////////////////////////////
  ////// Functions connected to APIs ////
  //////////////////////////////////////

  const addFile = async (title: string) => {
    setLoading(true);

    const res = await addWorkbook({ title });
    const newFile = getNewFile({ title, _id: res.createWorkbook._id });
    updateFlatData([...flatData, newFile]);

    setLoading(false);
  };

  const addFolder = async (title: string) => {
    setLoading(true);

    const res = await addWorkbookFolder({ title });
    const newFolder = getNewFolder({
      title,
      _id: res.createWorkbookFolder._id,
    });
    updateFlatData([...flatData, newFolder]);

    setLoading(false);
  };

  const handleDeleteClick = (node: TreeItem) => {
    return async () => {
      const itemsToDelete: Array<any> = [];
      findItemsToDelete(node, itemsToDelete);
      await setLoading(true);
      deleteItemsInRemote(itemsToDelete);
      deleteItemsInLocal(itemsToDelete);
      await setLoading(false);
    };
  };

  const deleteItemsInRemote = async (itemsToDelete: Array<any>) => {
    const deletePromises = itemsToDelete.map((item) => {
      if (item.type === "file") {
        return deleteWorkbook({ _id: item._id });
      } else {
        return deleteWorkbookFolder({ _id: item._id });
      }
    });
    await Promise.all(deletePromises);
  };

  const deleteItemsInLocal = (itemsToDelete: Array<any>) => {
    const filterItemsToDelete = (item: TreeItem) =>
      !itemsToDelete.find((itemToDelete) => itemToDelete._id === item._id);
    const newFlatData = flatData.filter(filterItemsToDelete);
    newFlatData.forEach((d) => {
      delete d.children;
    });
    updateFlatData(newFlatData);
  };

  const onMoveNode = ({ node, nextParentNode }: any) => {
    if (node.type === "file") {
      moveFile(node, nextParentNode);
    } else {
      moveFolder(node, nextParentNode);
    }
  };

  const moveFile = (node: TreeItem, nextParentNode: TreeItem) => {
    updateWorkbook({
      _id: node._id,
      field: "parentId",
      value: nextParentNode ? nextParentNode._id : null,
    });
    changeParentOfNode(node._id, nextParentNode ? nextParentNode._id : "0");
  };

  const moveFolder = (node: TreeItem, nextParentNode: TreeItem) => {
    updateWorkbookFolder({
      _id: node._id,
      field: "parentId",
      value: nextParentNode ? nextParentNode._id : null,
    });
    changeParentOfNode(node._id, nextParentNode ? nextParentNode._id : "0");
  };

  const changeParentOfNode = (id: string, newParentId: string) => {
    const indexOfNode = flatData.findIndex(
      (datum: TreeItem) => datum._id === id
    );
    const node = flatData[indexOfNode];
    const newFlatData = updateItemInArrayAtIndex(flatData, indexOfNode, {
      ...node,
      parentId: newParentId,
    });
    updateFlatData(newFlatData);
  };

  const handleOKPressInTitleModal = async () => {
    if (titleInModal) {
      handleTitleChange();
      handleTitleModalClose();
    }
  };

  const handleTitleChange = async () => {
    switch (currentMode) {
      case "add-file":
        addFile(titleInModal);
        break;
      case "add-folder":
        addFolder(titleInModal);
        break;
      case "edit-title":
        setLoading(true);
        if (selectedNode.type === "file") {
          await updateFileTitle();
        } else {
          await updateFolderTitle();
        }
        changeTitleOfNode(selectedNode, titleInModal);
        setLoading(false);
        break;
    }
  };

  const updateFileTitle = async () => {
    await updateWorkbook({
      _id: selectedNode._id,
      field: "title",
      value: titleInModal,
    });
  };

  const updateFolderTitle = async () => {
    await updateWorkbookFolder({
      _id: selectedNode._id,
      field: "title",
      value: titleInModal,
    });
  };

  const changeTitleOfNode = (selectedNode: any, title: string) => {
    const indexOfItem = flatData.findIndex(
      (datum) => selectedNode._id === datum._id
    );
    const newNode = {
      ...flatData[indexOfItem],
      title,
    };
    const newFlatData = updateItemInArrayAtIndex(
      flatData,
      indexOfItem,
      newNode
    );
    updateFlatData(newFlatData);
  };

  ///////////////////////////////////////
  //////// Ends ////////////////////////
  /////////////////////////////////////

  const handleGoBackClick = () => router.push("/index");

  const handleTitleModalOpen = () => {
    setShowTitleModal(true);
  };

  const handleTitleModalClose = () => {
    setShowTitleModal(false);
    setTitleInModal("");
    setSelectedNode(null);
  };

  const handleAddFileClick = () => {
    handleTitleModalOpen();
    setCurrentMode("add-file");
  };

  const handleAddFolderClick = () => {
    handleTitleModalOpen();
    setCurrentMode("add-folder");
  };

  const handleEditClick = (node: any) => {
    return () => {
      handleTitleModalOpen();
      setCurrentMode("edit-title");
      setTitleInModal(node.title);
      setSelectedNode(node);
    };
  };

  /////////////////////////////////////
  ////////// Sub components //////////
  ///////////////////////////////////

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

  const renderGoBack = () => (
    <SubMenu onTitleClick={handleGoBackClick} title="Go back to workbook" />
  );

  const handleEditFileClick = (node: TreeItem) => {
    return () => router.push(`/workbook/${node._id}`);
  };

  const isEditVisible = (node: any) => (node.type === "folder" ? "folder" : "");

  const generateNodeProps = ({ node }: any) => {
    return {
      title: <WorkbookTitle node={node} />,
      buttons: [
        <RiEditBoxLine
          onClick={handleEditFileClick(node)}
          size={16}
          className={`${isEditVisible(node)} edit-icon right-icon`}
        />,
        <MdTitle
          onClick={handleEditClick(node)}
          className="right-icon edit-icon rename"
          size={16}
        />,
        <FiTrash2
          size={16}
          className="right-icon trash-icon"
          onClick={handleDeleteClick(node)}
        />,
      ],
    };
  };

  /////////////////////////////////////////
  //////////// Ends //////////////////////
  ///////////////////////////////////////

  const loadingStyle = loading ? "loading" : "";

  return (
    <>
      <style>{style}</style>
      <TitleModal
        titleInModal={titleInModal}
        setTitleInModal={setTitleInModal}
        handleClose={handleTitleModalClose}
        visible={showTitleModal}
        handleOK={handleOKPressInTitleModal}
      />
      <Topbar>{renderGoBack()}</Topbar>
      <div className="page-container">
        <div className={`main-container`}>
          <Header />
          <div className={`tree-and-add-buttons ${loadingStyle}`}>
            <div className={`tree-container`}>
              <SortableTree
                flatData={flatData}
                updateFlatData={updateFlatData}
                onMoveNode={onMoveNode}
                getNodeKey={(node: TreeItem) => node._id}
                generateNodeProps={generateNodeProps}
              />
            </div>
            <AddFileFolder
              handleAddFileClick={handleAddFileClick}
              handleAddFolderClick={handleAddFolderClick}
            />
          </div>
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
  .loading {
    opacity:0.5;
    pointer-events:none;
  }
  .folder {
    visibility:hidden;
  }
`;

export default Workbooks;

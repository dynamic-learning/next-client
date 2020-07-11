import { TreeItem } from "react-sortable-tree";

export const getNewFile = ({ title, _id }: any) => ({
  title,
  type: "file",
  parentId: "0",
  _id,
});

export const getNewFolder = ({ title, _id }: any) => ({
  title,
  type: "folder",
  children: [],
  parentId: "0",
  _id,
});

export const findItemsToDelete = (node: any, itemsToDelete: Array<any>) => {
  itemsToDelete.push({ _id: node._id, type: node.type });
  if (!node.children) {
    return;
  } else {
    node.children.forEach((child: TreeItem) => {
      findItemsToDelete(child, itemsToDelete);
    });
  }
};

export const canDrop = ({ node, nextParent }: any) => {
  if (node && nextParent) {
    if (node.type === "file" && nextParent.type === "file") {
      return false;
    }
    if (node.type === "folder" && nextParent.type === "file") {
      return false;
    }
  }
  return true;
};

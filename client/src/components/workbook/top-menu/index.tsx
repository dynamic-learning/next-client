import React from "react";
import { Menu } from "antd";
import {
  UserAddOutlined,
  LoginOutlined,
  FileOutlined,
  BorderOuterOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Topbar from "../../top-bar/index";

const { SubMenu } = Menu;

const TopBar = ({ actions, actionDisablers }: any) => {
  const {
    handleAddSimButtonClick,
    goToPage,
    handleAddTextboxButtonClick,
    handleUndoButtonClick,
    handleRedoButtonClick,
    onPageCountChange,
  } = actions;

  const { undoable, redoable, canCanvasSizeBeReduced } = actionDisablers;

  const handleLoginClick = () => goToPage("/login");
  const handleSignUpClick = () => goToPage("/signup");
  const handleOpenClick = () => goToPage("/workbooks");

  const handleIncreaseSizeClick = () => {
    onPageCountChange(1);
  };

  const handleDecreaseSizeClick = () => {
    onPageCountChange(-1);
  };

  const renderFileMenu = () => (
    <SubMenu title="File" key="file" icon={<FileOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item key="new">New</Menu.Item>
        <Menu.Item onClick={handleOpenClick} key="open">
          Open
        </Menu.Item>
        <Menu.Item key="save">Save</Menu.Item>
        <Menu.Item key="examples">Examples</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  const renderEditMenu = () => (
    <SubMenu title="Edit" key="edit" icon={<EditOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item
          key="new"
          disabled={!undoable}
          onClick={handleUndoButtonClick}
        >
          Undo
        </Menu.Item>
        <Menu.Item
          key="open"
          disabled={!redoable}
          onClick={handleRedoButtonClick}
        >
          Redo
        </Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  const renderSlideMenu = () => (
    <SubMenu
      className="slide-menu"
      title="Slide"
      key="slide"
      icon={<BorderOuterOutlined />}
    >
      <Menu.ItemGroup>
        <Menu.Item onClick={handleAddSimButtonClick} key="simulation">
          Add Simulation
        </Menu.Item>
        <Menu.Item
          className="add-text-box-option"
          key="text-box"
          onClick={handleAddTextboxButtonClick}
        >
          Add text box
        </Menu.Item>
        <Menu.Item key="increase-size" onClick={handleIncreaseSizeClick}>
          Increase size
        </Menu.Item>
        <Menu.Item
          disabled={!canCanvasSizeBeReduced}
          key="decrease-size"
          onClick={handleDecreaseSizeClick}
        >
          Decrease size
        </Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  const renderLoginSignUp = () => (
    <div className="navitems-right">
      <Menu selectable={false} theme="dark" mode="horizontal">
        <Menu.Item
          onClick={handleLoginClick}
          key="login"
          icon={<LoginOutlined />}
        >
          Login
        </Menu.Item>
        <Menu.Item
          onClick={handleSignUpClick}
          key="signup"
          icon={<UserAddOutlined />}
        >
          Sign Up
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <style>{style}</style>
      <div className="topbar-container">
        <Topbar>
          {renderFileMenu()}
          {renderEditMenu()}
          {renderSlideMenu()}
          {renderLoginSignUp()}
        </Topbar>
      </div>
    </>
  );
};

const style = `
    .navitems-right {
        background-color:black;
        float: right;
        margin-right: 10px;
    }
`;

export default TopBar;

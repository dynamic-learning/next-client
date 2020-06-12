import React from "react";
import { Menu, Slider } from "antd";
import {
  UserAddOutlined,
  LoginOutlined,
  FileOutlined,
  BorderOuterOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { FaPen } from "react-icons/fa";
import Topbar from "../../top-bar/index";
import { SwatchesPicker } from "react-color";
import { BsSquareFill } from "react-icons/bs";

const { SubMenu } = Menu;

const TopBar = ({ actions, actionDisablers, canvasOptions }: any) => {
  const {
    handleAddSimButtonClick,
    goToPage,
    handleAddTextboxButtonClick,
    handleUndoButtonClick,
    handleRedoButtonClick,
    onPageCountChange,
    onCanvasOptionChange,
  } = actions;

  const { undoable, redoable, canCanvasSizeBeReduced } = actionDisablers;

  const handleLoginClick = () => goToPage("/login");
  const handleSignUpClick = () => goToPage("/signup");
  const handleOpenClick = () => goToPage("/workbooks");
  const handlSimulationCollectionClick = () => goToPage("/simulations");

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
      <SubMenu title="Add Simulation">
        <Menu.Item key="add-p5-url" onClick={handleAddSimButtonClick}>
          Via p5 web editor sketch url
        </Menu.Item>
        <Menu.Item
          onClick={handlSimulationCollectionClick}
          key="add-from-collection"
        >
          From simulation collection
        </Menu.Item>
      </SubMenu>
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

  const handleBrushStrokeChange = (e: any) => {
    onCanvasOptionChange("brushStroke", e);
  };

  const renderBrushStroke = () => (
    <SubMenu key="brushStroke" icon={<FaPen />}>
      <Menu.ItemGroup>
        <Menu.Item key="brushStroke">
          <Slider onAfterChange={handleBrushStrokeChange} defaultValue={30} />
        </Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  const handleChangeComplete = (color: any) => {
    onCanvasOptionChange("color", color.hex);
  };

  const renderColorPicker = () => (
    <SubMenu
      key="colorPicker"
      icon={<BsSquareFill fill={canvasOptions.color} />}
    >
      <Menu.ItemGroup>
        <Menu.Item style={colorPickerStyle} key="colorPicker">
          <SwatchesPicker onChangeComplete={handleChangeComplete} />
        </Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  return (
    <>
      <style>{style}</style>
      <div className="topbar-container">
        <Topbar>
          {renderFileMenu()}
          {renderEditMenu()}
          {renderSlideMenu()}
          {renderBrushStroke()}
          {renderColorPicker()}
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

const colorPickerStyle = {
  height: "100%",
  padding: "15px",
  margin: "0",
};

export default TopBar;

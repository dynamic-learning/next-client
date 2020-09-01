import React from "react";
import { Menu, Slider, Switch } from "antd";
import {
  UserAddOutlined,
  LoginOutlined,
  FileOutlined,
  BorderOuterOutlined,
  EditOutlined,
  SelectOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
} from "@ant-design/icons";
import { FaPen } from "react-icons/fa";
import Topbar from "../../top-bar/index";
import { SwatchesPicker } from "react-color";
import { BsSquareFill } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
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
    onClearSlide,
    saveWorkbook,
  } = actions;

  const { undoable, redoable, canCanvasSizeBeReduced } = actionDisablers;

  const handleOpenClick = () => goToPage("/workbooks");

  const handleSaveClick = (isAuthenticated: boolean) => {
    isAuthenticated
      ? saveWorkbook()
      : alert("Please sign in to save your work");
  };

  const { isAuthenticated } = useAuth();

  const renderFileMenu = () => (
    <SubMenu title="File" key="file" icon={<FileOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item key="new">New</Menu.Item>
        {isAuthenticated ? (
          <Menu.Item onClick={handleOpenClick} key="open">
            Open
          </Menu.Item>
        ) : null}
        <Menu.Item onClick={() => handleSaveClick(isAuthenticated)} key="save">
          Save
        </Menu.Item>
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

  const handleIncreaseSizeClick = () => {
    onPageCountChange(1);
  };

  const handleDecreaseSizeClick = () => {
    onPageCountChange(-1);
  };

  const handlSimulationCollectionClick = () => goToPage("/simulations");

  const handleClearClick = () => {
    onClearSlide();
  };

  const handleAboutClick = () => {
    goToPage("/about");
  };

  const renderSlideMenu = () => (
    <SubMenu
      className="slide-menu"
      title="Slide"
      key="slide"
      icon={<BorderOuterOutlined />}
    >
      <SubMenu className="add-simulation" title="Add Simulation">
        <Menu.Item
          className="add-p5-url"
          key="add-p5-url"
          onClick={handleAddSimButtonClick}
        >
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
      <Menu.Item
        className="increase-size"
        key="increase-size"
        onClick={handleIncreaseSizeClick}
      >
        Increase size
      </Menu.Item>
      <Menu.Item
        className="decrease-size"
        disabled={!canCanvasSizeBeReduced}
        key="decrease-size"
        onClick={handleDecreaseSizeClick}
      >
        Decrease size
      </Menu.Item>
      <Menu.Item className="clear-slide" onClick={handleClearClick}>
        Clear slide
      </Menu.Item>
    </SubMenu>
  );

  const handleLoginClick = () => goToPage("/login");
  const handleSignUpClick = () => goToPage("/signup");

  const renderLoginSignUp = () => (
    <div className="navitems-right">
      <Menu selectable={false} theme="dark" mode="horizontal">
        <SubMenu title="App">
          {isAuthenticated ? (
            <Menu.Item
              onClick={handleLoginClick}
              key="login"
              icon={<LoginOutlined />}
            >
              Login
            </Menu.Item>
          ) : null}
          {isAuthenticated ? (
            <Menu.Item
              onClick={handleSignUpClick}
              key="signup"
              icon={<UserAddOutlined />}
            >
              Sign Up
            </Menu.Item>
          ) : null}
          <Menu.Item
            icon={<ExclamationCircleOutlined />}
            onClick={handleAboutClick}
          >
            About
          </Menu.Item>
          <Menu.Item icon={<GithubOutlined />}>
            <a target="_blank" href="https://github.com/dynamic-learning">
              Contribute
            </a>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );

  const handleBrushStrokeChange = (e: any) => {
    onCanvasOptionChange("brushStroke", e);
  };

  const handleBrushClick = () => {
    onCanvasOptionChange("isDrawingMode", true);
  };

  const renderBrushStroke = () => (
    <SubMenu
      onTitleClick={handleBrushClick}
      key="brushStroke"
      icon={
        <FaPen
          className={
            canvasOptions.isDrawingMode && canvasOptions.isDrawingMode !== null
              ? "selected"
              : ""
          }
        />
      }
    >
      <Menu.ItemGroup>
        <Menu.Item key="brushStroke">
          <Slider onAfterChange={handleBrushStrokeChange} defaultValue={30} />
        </Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  const onSelectClick = () => {
    onCanvasOptionChange("isDrawingMode", false);
  };

  const renderSelect = () => (
    <SubMenu
      onTitleClick={onSelectClick}
      key="select"
      icon={
        <SelectOutlined
          className={
            !canvasOptions.isDrawingMode && canvasOptions.isDrawingMode !== null
              ? "selected"
              : ""
          }
        />
      }
    />
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

  const handleToggleChange = (interact: any) => {
    onCanvasOptionChange("interact", interact);
  };

  const renderSwitch = () => (
    <div className="switch">
      <Switch
        checked={canvasOptions.interact}
        onChange={handleToggleChange}
        checkedChildren="Draw"
        defaultChecked
        unCheckedChildren="Interact"
      />
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
          {renderSelect()}
          {renderBrushStroke()}
          {renderColorPicker()}
          <div className="navitems-right">
            {renderSwitch()}
            {renderLoginSignUp()}
          </div>
        </Topbar>
      </div>
    </>
  );
};

const style = `
  .switch {
     display:block;
  }
  .navitems-right {
    float:right;
    display:flex;
    flex-direction:row;
  }
  .selected {
    color:#1890ff;
  }
`;

const colorPickerStyle = {
  height: "100%",
  padding: "15px",
  margin: "0",
};

export default TopBar;

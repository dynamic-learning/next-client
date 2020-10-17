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
  LogoutOutlined,
} from "@ant-design/icons";
import { FaPen } from "react-icons/fa";
import Topbar from "../../top-bar/index";
import { SwatchesPicker } from "react-color";
import { BsSquareFill } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import ThemeContext from "../../../contexts";
import { useContext } from "react";
const { SubMenu } = Menu;

const TopBar = ({ actions, actionDisablers, canvasOptions, title }: any) => {
  const {
    handleAddSimButtonClick,
    goToPage,
    handleAddTextboxButtonClick,
    handleUndoButtonClick,
    handleRedoButtonClick,
    onPageCountChange,
    onCanvasOptionChange,
    onClearSlide,
    onSaveClick,
    onNewClick,
    onLoginClick,
    onSignUpClick,
    handlSimulationCollectionClick,
    handleOpenClick
  } = actions;

  const { undoable, redoable, canCanvasSizeBeReduced } = actionDisablers;

  const handleSaveClick = (isAuthenticated: boolean) => {
    isAuthenticated ? onSaveClick() : alert("Please sign in to save your work");
  };

  const { isAuthenticated, clearAuthData, username } = useAuth();

  const { theme } = useContext(ThemeContext);

  const handleLogoutClick = () => {
    clearAuthData();
    alert("You have been logged out");
  };

  const handleNewClick = () => {
    onNewClick();
  };

  const renderFileMenu = () => (
    <SubMenu className="file-menu" title="File" key="file" icon={<FileOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item className="new-option" onClick={handleNewClick} key="new">
          New
        </Menu.Item>
        {isAuthenticated ? (
          <Menu.Item className="new-option" onClick={handleOpenClick} key="open">
            Open
          </Menu.Item>
        ) : null}
        <Menu.Item className="save-option" onClick={() => handleSaveClick(isAuthenticated)} key="save">
          Save
        </Menu.Item>
        {/* <Menu.Item key="examples">Examples</Menu.Item> */}
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
          Add p5 web editor iframe link
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

  const renderLoginSignUp = () => (
    <div className="navitems-right">
      <Menu className="app-menu" selectable={false} theme="dark" mode="horizontal">
        <SubMenu title="App">
          {!isAuthenticated ? (
            <Menu.Item
              onClick={onLoginClick}
              key="login"
              icon={<LoginOutlined />}
              className="login-menu"
            >
              Login
            </Menu.Item>
          ) : null}
          {!isAuthenticated ? (
            <Menu.Item
              onClick={onSignUpClick}
              key="signup"
              icon={<UserAddOutlined />}
              className="signup-menu"
            >
              Sign Up
            </Menu.Item>
          ) : null}
          <Menu.Item
            icon={<ExclamationCircleOutlined />}
            onClick={handleAboutClick}
            className="about-menu"
          >
            About
          </Menu.Item>
          <Menu.Item icon={<GithubOutlined />}>
            <a target="_blank" href="https://github.com/dynamic-learning">
              Contribute
            </a>
          </Menu.Item>
          {isAuthenticated ? (
            <Menu.Item onClick={handleLogoutClick} icon={<LogoutOutlined />}>
              Logout
            </Menu.Item>
          ) : null}
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

  const User = () =>
    username ? (
      <div className="username">
        <span>Hey, {username}</span>
      </div>
    ) : null;

  const Title = ({ title }:any) => {
    if(!title) {
      return null;
    }
    if(title.length>50) {
      return <div className="title">[ {title.split("").slice(0,50).join("") + "..."} ]</div>
    } else {
      return <div className="title">[ {title} ]</div>
    }
  }

  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="topbar-container">
        <Topbar>
          {renderFileMenu()}
          {renderEditMenu()}
          {renderSlideMenu()}
          {renderSelect()}
          {renderBrushStroke()}
          {renderColorPicker()}
          <div className="navitems-right">
            {<Title title={title}/>}
            {<User />}
            {renderSwitch()}
            {renderLoginSignUp()}
          </div>
        </Topbar>
      </div>
    </>
  );
};

const getStyle = ({ color1 }: any) => `
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
  .username {
    margin-right:1rem;
    color:${color1};
    cursor: default;
    position:relative;
    top:2px;
  }
  .title {
    margin-right:1rem;
    color: white;
    cursor: default;
    position:relative;
    top:2px;
    font-weight:bold;
  }
`;

const colorPickerStyle = {
  height: "100%",
  padding: "15px",
  margin: "0",
};

export default TopBar;

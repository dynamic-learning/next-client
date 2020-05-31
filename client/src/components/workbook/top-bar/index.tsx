import React from "react";
import { Menu } from "antd";
import ThemeContext from "../../../contexts/index";
import { useContext } from "react";
import {
  LeftOutlined,
  LoginOutlined,
  FileOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const TopBar = ({ actions }: any) => {
  const { theme } = useContext(ThemeContext);
  const { handleAddSimButtonClick, goToPage } = actions;

  const handleLoginClick = () => goToPage("/login");
  const handleSignUpClick = () => goToPage("/signup");

  const renderFileMenu = () => (
    <SubMenu title="File" key="file" icon={<FileOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item key="new">New</Menu.Item>
        <Menu.Item key="open">Open</Menu.Item>
        <Menu.Item key="save">Save</Menu.Item>
        <Menu.Item key="examples">Examples</Menu.Item>
      </Menu.ItemGroup>
    </SubMenu>
  );

  const renderWorkbookMenu = () => (
    <SubMenu title="Workbook" key="workbook" icon={<BorderOuterOutlined />}>
      <Menu.ItemGroup>
        <Menu.Item onClick={handleAddSimButtonClick} key="simulation">
          Add Simulation
        </Menu.Item>
        <Menu.Item key="text-box">Add text box</Menu.Item>
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
          icon={<LeftOutlined />}
        >
          Sign Up
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="topbar-container">
        <Menu selectable={false} theme="dark" mode="horizontal">
          {renderFileMenu()}
          {renderWorkbookMenu()}
          {renderLoginSignUp()}
        </Menu>
      </div>
    </>
  );
};

const getStyle = ({ color8 }: any) => `
    .navitems-right {
        background-color:black;
        float: right;
        margin-right: 10px;
    }
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
        background:${color8};
    }
`;

export default TopBar;

import { Menu } from "antd";

const { SubMenu } = Menu;

import {
  UserAddOutlined,
  LoginOutlined,
  FileOutlined,
  BorderOuterOutlined,
} from "@ant-design/icons";

export const FileMenu = (props: any) => {
  const { handleOpenClick, ...leftOver } = props;
  return (
    <SubMenu title="File" key="file" icon={<FileOutlined />} {...leftOver}>
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
};

export const WorkbookMenu = (props: any) => {
  const {
    handleAddSimButtonClick,
    handleAddTextboxButtonClick,
    ...leftOver
  } = props;
  return (
    <SubMenu
      className="workbook-menu"
      title="Workbook"
      key="workbook"
      icon={<BorderOuterOutlined />}
      {...leftOver}
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
      </Menu.ItemGroup>
    </SubMenu>
  );
};

export const LoginSignupMenu = (props: any) => {
  const { handleLoginClick, handleSignUpClick } = props;
  return (
    <>
      <style>{loginSignupMenuStyle}</style>
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
    </>
  );
};

const loginSignupMenuStyle = `
.navitems-right {
    background-color:black;
    float: right;
    margin-right: 10px;
}
`;

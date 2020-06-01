import React from "react";
import { Menu } from "antd";
import ThemeContext from "../../../contexts/index";
import { useContext } from "react";
import { FileMenu, WorkbookMenu, LoginSignupMenu } from "./sub-menus";

const TopMenu = (props: any) => {
  const { theme } = useContext(ThemeContext);
  const {
    handleAddSimButtonClick,
    goToPage,
    handleAddTextboxButtonClick,
  } = props;

  const handleLoginClick = () => goToPage("/login");
  const handleSignUpClick = () => goToPage("/signup");
  const handleOpenClick = () => goToPage("/workbooks");

  return (
    <>
      <style>{getStyle(theme)}</style>
      <div className="topbar-container">
        <Menu selectable={false} theme="dark" mode="horizontal">
          <FileMenu handleOpenClick={handleOpenClick} />
          <WorkbookMenu
            handleAddTextboxButtonClick={handleAddTextboxButtonClick}
            handleAddSimButtonClick={handleAddSimButtonClick}
          />
          <LoginSignupMenu
            handleLoginClick={handleLoginClick}
            handleSignupClick={handleSignUpClick}
          />
        </Menu>
      </div>
    </>
  );
};

const getStyle = ({ color8 }: any) => `
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
        background:${color8};
    }
`;

export default TopMenu;

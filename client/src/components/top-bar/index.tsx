import { Menu } from "antd";
import ThemeContext from "../../contexts/index";
import { useContext } from "react";

export default (props: any) => {
  const { theme } = useContext(ThemeContext);
  return (
    <>
      <style>{getStyle(theme)}</style>
      <Menu selectable={false} theme="dark" mode="horizontal">
        {props.children}
      </Menu>
    </>
  );
};

const getStyle = ({ color8 }: any) => `
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
        background:${color8};
    }
`;

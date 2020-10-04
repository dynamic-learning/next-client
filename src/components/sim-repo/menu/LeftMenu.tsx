import { Menu } from "antd";
import ThemeContext from "../../../contexts/index";
import { useContext } from "react";

const subjects = ["Physics", "Maths", "Computer Science", "Biology"];

interface Props {
  onCategoryClick(category: String): void;
}

const LeftMenu = (props: Props) => {
  const { theme } = useContext(ThemeContext);
  const { onCategoryClick } = props;
  const handleClick = (e: any) => {
    onCategoryClick(e.key);
  };
  return (
    <>
      <style>{getStyle(theme)}</style>
      <Menu className="menu" theme="dark">
        <div className="select-subject">Select subject</div>
        {subjects.map((subject) => (
          <Menu.Item onClick={handleClick} key={subject}>
            {subject}
          </Menu.Item>
        ))}
      </Menu>
    </>
  );
};

const getStyle = ({ color8 }: any) => `
    .select-subject {
       padding:2rem 0;
       padding-left:1rem;
       color:white;
       font-size:1rem;
    }
    .menu {
        height:100%;
    }
    .ant-menu.ant-menu-dark, .ant-menu-dark .ant-menu-sub {
        background:${color8};
    }
`;

export default LeftMenu;

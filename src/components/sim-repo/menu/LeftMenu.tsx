import { Menu } from "antd";
import ThemeContext from "../../../contexts/index";
import { useContext } from "react";
import { Button } from "antd";
import { useRouter } from "next/router"

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
  const router = useRouter();
  const handleBackClick = () => {
    const savedState = localStorage.getItem("savedState")
    if(savedState) {
      const parsedState = JSON.parse(savedState);
      router.push(parsedState.atPath);
    }
  }
  
  return (
    <>
      <style>{getStyle(theme)}</style>
      <Menu className="menu" theme="dark">
        <div className="button-container">
          <Button type="primary" className="back-button" onClick={handleBackClick}>Back</Button>
        </div>
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
    .back-button {
      width:80px;
      margin-top:1rem;
      margin-left:1rem;
    }
`;

export default LeftMenu;

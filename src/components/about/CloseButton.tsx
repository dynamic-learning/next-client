import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const CloseButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <style>{style}</style>
      <div className="close-button">
        <CloseCircleOutlined onClick={handleClick} className="icon" />
      </div>
    </>
  );
};

const style = `
  .close-button {
    position:fixed;
    right:10px;
    top:10px;
  }
  .icon {
    font-size:25px;
    cursor:pointer;
    color:grey;
  }
  .icon:hover {
    color:black;
  }
`;

export default CloseButton;

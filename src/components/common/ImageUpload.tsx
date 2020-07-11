import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";

const ImageUpload = ({ imgUrl, setImgUrl }: any) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(imgUrl);
    if (imgUrl) {
      setImgUrl(imgUrl);
    }
  }, []);

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl: string) => {
        setLoading(false);
        const image = new Image();
        image.src = imageUrl;
        setImgUrl(imageUrl);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imgUrl ? (
        <img src={imgUrl} style={{ maxWidth: "80px", maxHeight: "80px" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

const getBase64 = (img: any, callback: any) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  console.log(file);
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default ImageUpload;

import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

const UploadImage = ({ fileList, setFileList }) => {
  const accessToken = localStorage.getItem("accessToken");

  const handleChange = ({ fileList }) => {
    setFileList(fileList);
  };

  return (
    <Upload
      action="http://localhost:8000/api/upload"
      method="POST"
      name="files"
      multiple
      listType="picture"
      fileList={fileList}
      onChange={handleChange}
      headers={{
        Authorization: `Bearer ${accessToken}`,
      }}
      showUploadList={{ showRemoveIcon: true }}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        Upload Files
      </Button>
    </Upload>
  );
};

export default UploadImage;

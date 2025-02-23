import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

const UploadImage = () => {
  const [fileList, setFileList] = useState([]);

  const accessToken = localStorage.getItem("accessToken");

  const handleChange = ({ file, fileList }) => {
    setFileList(fileList);

    if (file.status === "done") {
      message.success(`${file.name} uploaded successfully`);
    } else if (file.status === "error") {
      message.error(`${file.name} upload failed.`);
    }
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

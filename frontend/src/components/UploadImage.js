import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";

const UploadImage = ({ fileList, setFileList }) => {
  const handleChange = ({ fileList }) => {
    setFileList(fileList); // ✅ Lưu file vào state, không upload ngay
  };

  return (
    <Upload
      name="files"
      multiple
      listType="picture"
      fileList={fileList}
      onChange={handleChange}
      beforeUpload={() => false} // ✅ Không upload ngay, chỉ lưu vào fileList
      showUploadList={{ showRemoveIcon: true }}
    >
      <Button type="primary" icon={<UploadOutlined />}>
        Chọn ảnh
      </Button>
    </Upload>
  );
};

export default UploadImage;

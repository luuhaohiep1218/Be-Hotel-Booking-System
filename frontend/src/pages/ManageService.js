import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Form, Pagination, message } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import StaffSidebar from "../components/StaffSidebar";
import API from "../utils/axiosInstance";

// Styled components
const MServiceContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #eef1f6;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "70px")};
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 130px);
`;

const Header = styled.header`
  padding: 15px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const ManageService = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [services, setServices] = useState([]); // Luôn khởi tạo là mảng rỗng
  const [form] = Form.useForm();

  const fetchData = async () => {
    try {
      const response = await API.get("/service");
      setServices(response.data.services);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu dịch vụ:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (service = null) => {
    setEditingService(service);
    form.setFieldsValue(service || { name: "", description: "", price: "" });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSaveService = async (values) => {
    try {
      if (editingService) {
        // Nếu đang chỉnh sửa, gọi API sửa dịch vụ
        await API.put(`/service/${editingService._id}`, values);
        message.success("Cập nhật dịch vụ thành công!");
      }
      setIsModalVisible(false);
      form.resetFields();
      fetchData(); // Lấy lại dữ liệu sau khi thêm/sửa
    } catch (error) {
      console.error("Lỗi khi lưu dịch vụ:", error);
      message.error("Đã xảy ra lỗi khi lưu dịch vụ!");
    }
  };

  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Loại dịch vụ",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button
            type="link"
            danger
            onClick={() => console.log("Xóa dịch vụ:", record.id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <MServiceContainer>
      <StaffSidebar onToggle={setIsSidebarOpen} />
      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <Header>Quản lý dịch vụ</Header>

        <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
          >
            Thêm dịch vụ
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={Array.isArray(services) ? services : []} // Luôn là mảng
          rowKey="id"
          pagination={false}
        />

        <Pagination
          current={1}
          pageSize={5}
          total={services.length}
          onChange={(page, size) => console.log("Chuyển trang:", page, size)}
          style={{ marginTop: "16px", textAlign: "right" }}
        />

        <Modal
          title={editingService ? "Sửa dịch vụ" : "Thêm dịch vụ"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleSaveService} layout="vertical">
            <Form.Item
              label="Tên dịch vụ"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Tóm tắt"
              name="summary"
              rules={[{ required: true, message: "Vui lòng nhập tóm tắt" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại dịch vụ"
              name="category"
              rules={[
                { required: true, message: "Vui lòng nhập loại dịch vụ" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
              <Button onClick={handleCancel} style={{ marginLeft: "10px" }}>
                Hủy
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </ContentWrapper>
    </MServiceContainer>
  );
};

export default ManageService;

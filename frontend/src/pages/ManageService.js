import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Pagination } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import StaffSidebar from "../components/StaffSidebar";

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
  const [isModalVisible, setIsModalVisible] = useState(false); // Hiển thị modal thêm/sửa dịch vụ
  const [editingService, setEditingService] = useState(null); // Dịch vụ đang chỉnh sửa
  const [form] = Form.useForm(); // Form quản lý dữ liệu

  // Dữ liệu mẫu (mock data)
  const mockServices = [
    {
      id: 1,
      name: "Dịch vụ phòng",
      description: "Dọn dẹp phòng hàng ngày",
      price: "500,000 VND",
    },
    {
      id: 2,
      name: "Dịch vụ ăn uống",
      description: "Phục vụ bữa sáng miễn phí",
      price: "0 VND",
    },
    {
      id: 3,
      name: "Dịch vụ spa",
      description: "Massage thư giãn",
      price: "1,000,000 VND",
    },
  ];

  // Mở modal thêm/sửa dịch vụ
  const showModal = (service = null) => {
    setEditingService(service);
    form.setFieldsValue(service || { name: "", description: "", price: "" });
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý lưu dịch vụ (chỉ là giao diện, không có logic API)
  const handleSaveService = (values) => {
    console.log("Dữ liệu dịch vụ:", values);
    setIsModalVisible(false);
  };

  // Cột của bảng
  const columns = [
    {
      title: "Tên dịch vụ",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => console.log("Xóa dịch vụ:", record.id)}>
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

        {/* Thanh tìm kiếm và nút thêm dịch vụ */}
        <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
          <Input
            placeholder="Tìm kiếm dịch vụ..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Thêm dịch vụ
          </Button>
        </div>

        {/* Bảng hiển thị danh sách dịch vụ */}
        <Table
          columns={columns}
          dataSource={mockServices}
          rowKey="id"
          pagination={false}
        />

        {/* Phân trang */}
        <Pagination
          current={1}
          pageSize={5}
          total={mockServices.length}
          onChange={(page, size) => console.log("Chuyển trang:", page, size)}
          style={{ marginTop: "16px", textAlign: "right" }}
        />

        {/* Modal thêm/sửa dịch vụ */}
        <Modal
          title={editingService ? "Sửa dịch vụ" : "Thêm dịch vụ"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleSaveService} layout="vertical">
            <Form.Item
              label="Tên dịch vụ"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên dịch vụ" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
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
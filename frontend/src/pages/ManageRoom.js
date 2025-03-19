import React, { useState } from "react";
import { Table, Input, Button, Modal, Form, Pagination } from "antd";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import StaffSidebar from "../components/StaffSidebar"; // Import StaffSidebar

// Styled components
const ManageRoomContainer = styled.div`
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

const ManageRoom = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Trạng thái mở/đóng sidebar
  const [isModalVisible, setIsModalVisible] = useState(false); // Hiển thị modal thêm/sửa phòng
  const [editingRoom, setEditingRoom] = useState(null); // Phòng đang chỉnh sửa
  const [form] = Form.useForm(); // Form quản lý dữ liệu

  // Dữ liệu mẫu (mock data)
  const mockRooms = [
    {
      id: 1,
      name: "Phòng 101",
      description: "Phòng đơn, view đẹp",
      capacity: 2,
    },
    {
      id: 2,
      name: "Phòng 102",
      description: "Phòng đôi, tiện nghi",
      capacity: 4,
    },
    {
      id: 3,
      name: "Phòng 103",
      description: "Phòng gia đình",
      capacity: 6,
    },
  ];

  // Mở modal thêm/sửa phòng
  const showModal = (room = null) => {
    setEditingRoom(room);
    form.setFieldsValue(room || { name: "", description: "", capacity: "" });
    setIsModalVisible(true);
  };

  // Đóng modal
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Xử lý lưu phòng (chỉ là giao diện, không có logic API)
  const handleSaveRoom = (values) => {
    console.log("Dữ liệu phòng:", values);
    setIsModalVisible(false);
  };

  // Cột của bảng
  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Sức chứa",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record) => (
        <div>
          <Button type="link" onClick={() => showModal(record)}>
            Sửa
          </Button>
          <Button type="link" danger onClick={() => console.log("Xóa phòng:", record.id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ManageRoomContainer>
      {/* Sidebar */}
      <StaffSidebar onToggle={setIsSidebarOpen} />

      {/* Nội dung chính */}
      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <Header>Quản lý phòng</Header>

        {/* Thanh tìm kiếm và nút thêm phòng */}
        <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
          <Input
            placeholder="Tìm kiếm phòng..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
            Thêm phòng
          </Button>
        </div>

        {/* Bảng hiển thị danh sách phòng */}
        <Table
          columns={columns}
          dataSource={mockRooms}
          rowKey="id"
          pagination={false}
        />

        {/* Phân trang */}
        <Pagination
          current={1}
          pageSize={5}
          total={mockRooms.length}
          onChange={(page, size) => console.log("Chuyển trang:", page, size)}
          style={{ marginTop: "16px", textAlign: "right" }}
        />

        {/* Modal thêm/sửa phòng */}
        <Modal
          title={editingRoom ? "Sửa phòng" : "Thêm phòng"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleSaveRoom} layout="vertical">
            <Form.Item
              label="Tên phòng"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Sức chứa"
              name="capacity"
              rules={[{ required: true, message: "Vui lòng nhập sức chứa" }]}
            >
              <Input type="number" />
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
    </ManageRoomContainer>
  );
};

export default ManageRoom;
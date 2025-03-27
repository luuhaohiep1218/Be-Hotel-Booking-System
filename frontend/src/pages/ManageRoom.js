import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Form, Pagination, message, Switch, Select, InputNumber, Upload } from "antd";
import { SearchOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import StaffSidebar from "../components/StaffSidebar";
import API from "../utils/axiosInstance";

const { Option } = Select;
const { TextArea } = Input;

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [searchParams, setSearchParams] = useState('name');

  const fetchData = async () => {
    try {
      const roomResponse = await API.get("/room?sort=+quantityLeft");
      setRooms(roomResponse.data.rooms);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu phòng:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (room = null) => {
    setEditingRoom(room);
    if (room) {
      form.setFieldsValue({
        ...room,
        roomNumbers: room.roomNumber.map(rn => ({
          roomNumber: rn.roomNumber,
          status: rn.status,
          isActivated: rn.isActivated
        }))
      });
      setRoomNumbers(room.roomNumber.map(rn => ({
        roomNumber: rn.roomNumber,
        status: rn.status,
        isActivated: rn.isActivated
      })));
      setFileList(room.images.map(image => ({
        uid: image,
        name: image,
        status: 'done',
        url: image
      })));
    } else {
      form.resetFields();
      setRoomNumbers([]);
      setFileList([]);
    }
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setRoomNumbers([]);
    setFileList([]);
  };

  const handleSaveRoom = async (values) => {
    try {
      // Chuẩn bị dữ liệu roomNumber đúng định dạng
      const roomNumberData = roomNumbers.map(rn => ({
        roomNumber: rn.roomNumber,
        status: rn.status,
        isActivated: rn.isActivated
      }));

      // Chuẩn bị payload
      const payload = {
        ...values,
        roomNumber: roomNumberData,
        images: fileList.map(file => file.url || file.name),
        // Tính toán lại quantity và quantityLeft
        quantity: roomNumberData.length,
        quantityLeft: roomNumberData.filter(rn => rn.status === "trống" && rn.isActivated).length
      };

      console.log(payload);


      // Kiểm tra dữ liệu
      if (roomNumberData.length === 0) {
        message.error("Vui lòng thêm ít nhất một số phòng");
        return;
      }

      if (roomNumberData.some(rn => rn.roomNumber === null || rn.roomNumber === undefined)) {
        message.error("Vui lòng nhập đầy đủ số phòng");
        return;
      }

      let response;
      if (editingRoom) {
        // Gọi API cập nhật và LẤY LẠI DỮ LIỆU ĐÃ CẬP NHẬT
        response = await API.put(`/room/${editingRoom._id}`, payload);
        message.success("Cập nhật phòng thành công!");
      } else {
        response = await API.post("/room", payload);
        message.success("Thêm phòng thành công!");
      }

      // Cập nhật lại state với dữ liệu mới từ server
      setRooms(prevRooms => {
        if (editingRoom) {
          return prevRooms.map(room =>
            room._id === editingRoom._id ? response.data.room : room
          );
        } else {
          return [...prevRooms, response.data.room];
        }
      });

      setIsModalVisible(false);
    } catch (error) {
      console.error("Lỗi khi lưu phòng:", error);
      message.error(error.response?.data?.message ||
        (editingRoom ? "Cập nhật phòng thất bại!" : "Thêm phòng thất bại!"));
    }
  };

  const handleStatusChange = async (checked, room) => {
    try {
      const newStatus = checked ? "trống" : "hết phòng";
      await API.put(`/room/${room._id}`, { status: newStatus });
      message.success("Cập nhật trạng thái phòng thành công!");
      fetchData();
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái phòng:", error);
      message.error("Cập nhật trạng thái phòng thất bại!");
    }
  };


  const updateRoomNumber = (index, field, value) => {
    const newRoomNumbers = [...roomNumbers];

    // Nếu cập nhật số phòng, kiểm tra trùng lặp
    if (field === 'roomNumber') {
      const isDuplicate = newRoomNumbers.some((rn, i) =>
        i !== index && rn.roomNumber === value
      );

      if (isDuplicate) {
        message.error("Số phòng đã tồn tại");
        return;
      }
    }

    newRoomNumbers[index][field] = value;
    setRoomNumbers(newRoomNumbers);

    // Nếu cập nhật status hoặc isActivated, tính lại quantityLeft
    if (field === 'status' || field === 'isActivated') {
      form.setFieldsValue({
        quantityLeft: newRoomNumbers.filter(rn =>
          rn.status === "trống" && rn.isActivated
        ).length
      });
    }
  };

  // Sửa hàm addRoomNumber để thêm số phòng mới không trùng
  const addRoomNumber = () => {
    // Tìm số phòng lớn nhất hiện có + 1
    const maxRoomNumber = roomNumbers.reduce((max, rn) =>
      Math.max(max, rn.roomNumber || 0), 0);

    setRoomNumbers([
      ...roomNumbers,
      {
        roomNumber: maxRoomNumber + 1,
        status: "trống",
        isActivated: true
      }
    ]);
  };
  const removeRoomNumber = (index) => {
    const newRoomNumbers = [...roomNumbers];
    newRoomNumbers.splice(index, 1);
    setRoomNumbers(newRoomNumbers);
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      // Hiển thị confirm dialog trước khi xóa
      Modal.confirm({
        title: 'Xác nhận xóa phòng',
        content: 'Bạn có chắc chắn muốn xóa phòng này?',
        okText: 'Xóa',
        okType: 'danger',
        cancelText: 'Hủy',
        async onOk() {
          try {
            await API.delete(`/room`, {
              data: { roomIds: [roomId] } // Gửi dưới dạng body
            });
            message.success('Xóa phòng thành công!');
            fetchData(); // Cập nhật lại danh sách phòng
          } catch (error) {
            console.error('Lỗi khi xóa phòng:', error);
            message.error(error.response?.data?.message || 'Xóa phòng thất bại!');
          }
        }
      });
    } catch (error) {
      console.error('Lỗi khi hiển thị confirm:', error);
    }
  };

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSearch = async () => {
    try {
      let query = {};
      
      if (searchText) {
        // Xây dựng query tìm kiếm đơn giản hơn
        query[searchParams] = searchText;
        
        // Nếu tìm theo trạng thái, xử lý riêng
        if (searchParams === 'status') {
          query.status = searchText === 'trống' ? 'trống' : 'hết phòng';
        }
      }
  
      const roomResponse = await API.get("/room", {
        params: {
          filter: JSON.stringify(query), // Gửi filter dưới dạng JSON string
          sort: '+quantityLeft'
        }
      });
      
      setRooms(roomResponse.data.rooms);
      
      if (roomResponse.data.rooms.length === 0) {
        message.info("Không tìm thấy phòng nào phù hợp");
      }
    } catch (error) {
      console.error("Lỗi khi tìm kiếm phòng:", error);
      message.error("Lỗi khi tìm kiếm phòng");
    }
  };
  
  // Thêm nút reset tìm kiếm
  const handleResetSearch = () => {
    setSearchText('');
    setSearchParams('name');
    fetchData(); // Load lại toàn bộ dữ liệu
  };

  const columns = [
    {
      title: "Tên phòng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại phòng",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Số giường",
      dataIndex: "beds",
      key: "beds",
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => (
        <Switch
          checked={status === "trống"}
          onChange={(checked) => handleStatusChange(checked, record)}
          checkedChildren="Trống"
          unCheckedChildren="Hết"
        />
      ),
    },
    {
      title: "Tổng số phòng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Số phòng còn lại",
      dataIndex: "quantityLeft",
      key: "quantityLeft",
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
            onClick={() => handleDeleteRoom(record._id)}
          >
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <ManageRoomContainer>
      <StaffSidebar onToggle={setIsSidebarOpen} />

      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <Header>Quản lý phòng</Header>

        <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>

          <Select
            defaultValue="name"
            style={{ width: 120 }}
            onChange={(value) => setSearchParams(value)}
          >
            <Option value="name">Tên phòng</Option>
            <Option value="type">Loại phòng</Option>
            <Option value="location">Vị trí</Option>
            <Option value="status">Trạng thái</Option>
          </Select>

          <Input
            placeholder="Nhập từ khóa tìm kiếm..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onPressEnter={handleSearch} // Tìm kiếm khi nhấn Enter
          />

          <Button type="primary" onClick={handleSearch}>
            Tìm kiếm
          </Button>

          <Button onClick={handleResetSearch}>
            Reset
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => showModal()}
            style={{ marginLeft: 'auto' }}
          >
            Thêm phòng
          </Button>

        </div>

        <Table
          columns={columns}
          dataSource={rooms}
          rowKey="_id"
          pagination={false}
        />

        <Pagination
          current={1}
          pageSize={10}
          total={rooms.length}
          onChange={(page, size) => console.log("Chuyển trang:", page, size)}
          style={{ marginTop: "16px", textAlign: "right" }}
        />

        <Modal
          title={editingRoom ? "Sửa phòng" : "Thêm phòng"}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <Form form={form} onFinish={handleSaveRoom} layout="vertical">
            <Form.Item
              label="Tên phòng"
              name="name"
              rules={[{ required: true, message: "Vui lòng nhập tên phòng" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Loại phòng"
              name="type"
              rules={[{ required: true, message: "Vui lòng nhập loại phòng" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Dịch vụ"
              name="services"
              rules={[{ required: true, message: "Vui lòng nhập dịch vụ" }]}
            >
              <Select mode="tags" tokenSeparators={[',']} placeholder="Nhập dịch vụ">
                {['Wifi', 'Điều hòa', 'TV', 'Mini bar', 'Bể bơi', 'Bữa sáng'].map(service => (
                  <Option key={service}>{service}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Vị trí"
              name="location"
              rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Số giường"
              name="beds"
              rules={[{ required: true, message: "Vui lòng nhập số giường" }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá" }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            </Form.Item>

            <Form.Item
              label="Tổng số phòng"
              name="quantity"
              rules={[{ required: true, message: "Vui lòng nhập tổng số phòng" }]}
            >
              <InputNumber min={1} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Số phòng còn lại"
              name="quantityLeft"
              rules={[{ required: true, message: "Vui lòng nhập số phòng còn lại" }]}
            >
              <InputNumber min={0} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Số phòng chi tiết">
              <Button type="dashed" onClick={addRoomNumber} style={{ marginBottom: 10 }}>
                Thêm số phòng
              </Button>
              {roomNumbers.map((rn, index) => (
                <div key={index} style={{ display: 'flex', marginBottom: 8, gap: 8 }}>
                  <InputNumber
                    placeholder="Số phòng"
                    value={rn.roomNumber}
                    onChange={(value) => updateRoomNumber(index, 'roomNumber', value)}
                    style={{ width: '30%' }}
                  />
                  <Select
                    value={rn.status}
                    onChange={(value) => updateRoomNumber(index, 'status', value)}
                    style={{ width: '30%' }}
                  >
                    <Option value="trống">Trống</Option>
                    <Option value="hết phòng">Hết phòng</Option>
                  </Select>
                  <Button danger onClick={() => removeRoomNumber(index)}>
                    Xóa
                  </Button>
                </div>
              ))}
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <Upload
                listType="picture"
                fileList={fileList}
                onChange={handleUploadChange}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Tải lên</Button>
              </Upload>
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
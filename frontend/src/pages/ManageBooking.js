import React, { useState, useEffect } from "react";
import { Table, Input, Button, Modal, Form, Select, Tag, message, Pagination } from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import styled from "styled-components";
import StaffSidebar from "../components/StaffSidebar";
import API from "../utils/axiosInstance";

// Styled components
const BookingContainer = styled.div`
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

const ManageBooking = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const [searchParams, setSearchParams] = useState({
        type: "",
        status: "",
        search: "",
    });
    const [form] = Form.useForm();

    const fetchBookings = async () => {
        setLoading(true);
        try {
          const { current, pageSize } = pagination;
          const params = {
            page: current,
            limit: pageSize,
            ...searchParams,
          };
      
          const response = await API.get("/booking", { params });
          setBookings(response.data.bookings);
          setPagination({
            ...pagination,
            total: response.data.totalBookings,
          });
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu bookings:", error);
          message.error("Đã xảy ra lỗi khi tải dữ liệu!");
        } finally {
          setLoading(false);
        }
      };

    useEffect(() => {
        fetchBookings();
    }, [pagination.current, pagination.pageSize, searchParams]);

    const handleTableChange = (pagination) => {
        setPagination(pagination);
    };

    const handleSearch = (value) => {
        setSearchParams({ ...searchParams, search: value });
        setPagination({ ...pagination, current: 1 });
    };

    const handleFilterChange = (key, value) => {
        setSearchParams({ ...searchParams, [key]: value });
        setPagination({ ...pagination, current: 1 });
    };

    const showDetailModal = (booking) => {
        setCurrentBooking(booking);
        form.setFieldsValue({
            status: booking.status,
            paymentStatus: booking.paymentStatus,
            notes: booking.notes,
        });
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleUpdateBooking = async () => {
        try {
          const values = await form.validateFields();
          
          // Gọi API cập nhật
          const response = await API.patch(`/booking/${currentBooking._id}`, values);
          
          // Hiển thị thông báo thành công
          message.success("Cập nhật booking thành công!");
          
          // Làm mới danh sách
          fetchBookings();
          
          // Đóng modal
          setIsModalVisible(false);
          
        } catch (error) {
          console.error("Lỗi khi cập nhật booking:", error);
          
          // Hiển thị thông báo lỗi từ server nếu có
          const errorMessage = error.response?.data?.message 
            || "Đã xảy ra lỗi khi cập nhật!";
          
          message.error(errorMessage);
        }
      };

    const statusTag = (status) => {
        let color = "";
        switch (status) {
            case "confirmed":
                color = "green";
                break;
            case "pending":
                color = "orange";
                break;
            case "canceled":
                color = "red";
                break;
            default:
                color = "gray";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
    };

    const paymentTag = (status) => {
        let color = "";
        switch (status) {
            case "paid":
                color = "green";
                break;
            case "pending":
                color = "orange";
                break;
            case "failed":
                color = "red";
                break;
            default:
                color = "gray";
        }
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
    };

    const columns = [
        {
            title: "Mã Booking",
            dataIndex: "_id",
            key: "_id",
            render: (id) => id.slice(-6).toUpperCase(),
        },
        {
            title: "Khách hàng",
            key: "customer",
            render: (_, record) => (
                <div>
                    <div>{record.userId?.full_name || "N/A"}</div>
                    <div style={{ color: "#888" }}>{record.userId?.email || "N/A"}</div>
                </div>
            ),
        },
        {
            title: "Loại",
            dataIndex: "type",
            key: "type",
            render: (type) => (
                <Tag color={type === "room" ? "blue" : "purple"}>
                    {type === "room" ? "PHÒNG" : "DỊCH VỤ"}
                </Tag>
            ),
            filters: [
                { text: "Phòng", value: "room" },
                { text: "Dịch vụ", value: "service" },
            ],
            onFilter: (value, record) => record.type === value,
        },
        {
            title: "Chi tiết",
            key: "details",
            render: (_, record) => {
                if (record.type === "room") {
                    return (
                        <div>
                            <div>{record.rooms?.length || 0} phòng</div>
                            <div>
                                {record.checkIn
                                    ? new Date(record.checkIn).toLocaleDateString()
                                    : "N/A"}
                                {" - "}
                                {record.checkOut
                                    ? new Date(record.checkOut).toLocaleDateString()
                                    : "N/A"}
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <div>{record.serviceId?.name || "Dịch vụ"}</div>
                            <div>Số lượng: {record.serviceQuantity || 1}</div>
                        </div>
                    );
                }
            },
        },
        {
            title: "Tổng tiền",
            dataIndex: "price",
            key: "price",
            render: (price) => `${price?.toLocaleString() || 0} VND`,
            sorter: (a, b) => a.price - b.price,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: statusTag,
            filters: [
                { text: "Đã xác nhận", value: "confirmed" },
                { text: "Chờ xử lý", value: "pending" },
                { text: "Đã hủy", value: "canceled" },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: "Thanh toán",
            dataIndex: "paymentStatus",
            key: "paymentStatus",
            render: paymentTag,
            filters: [
                { text: "Đã thanh toán", value: "paid" },
                { text: "Chờ thanh toán", value: "pending" },
                { text: "Thất bại", value: "failed" },
            ],
            onFilter: (value, record) => record.paymentStatus === value,
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, record) => (
                <Button type="link" onClick={() => showDetailModal(record)}>
                    Chi tiết
                </Button>
            ),
        },
    ];

    return (
        <BookingContainer>
            <StaffSidebar onToggle={setIsSidebarOpen} />
            <ContentWrapper isSidebarOpen={isSidebarOpen}>
                <Header>Quản lý bookings</Header>

                <div style={{ marginBottom: "16px", display: "flex", gap: "10px" }}>
                    <Input
                        placeholder="Tìm kiếm theo mã booking, tên khách..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        allowClear
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Select
                        placeholder="Lọc theo trạng thái"
                        style={{ width: 150 }}
                        allowClear
                        onChange={(value) => handleFilterChange("status", value)}
                    >
                        <Select.Option value="confirmed">Đã xác nhận</Select.Option>
                        <Select.Option value="pending">Chờ xử lý</Select.Option>
                        <Select.Option value="canceled">Đã hủy</Select.Option>
                    </Select>
                    <Select
                        placeholder="Lọc theo loại"
                        style={{ width: 120 }}
                        allowClear
                        onChange={(value) => handleFilterChange("type", value)}
                    >
                        <Select.Option value="room">Phòng</Select.Option>
                        <Select.Option value="service">Dịch vụ</Select.Option>
                    </Select>
                    <Button
                        icon={<SyncOutlined />}
                        onClick={fetchBookings}
                    >
                        Làm mới
                    </Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={bookings}
                    rowKey="_id"
                    loading={loading}
                    pagination={pagination}
                    onChange={handleTableChange}
                    scroll={{ x: 1500 }}
                />

                <Modal
                    title={`Chi tiết Booking #${currentBooking?._id?.slice(-6).toUpperCase() || ""}`}
                    open={isModalVisible}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Đóng
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            onClick={handleUpdateBooking}
                        >
                            Cập nhật
                        </Button>,
                    ]}
                    width={700}
                >
                    <Form form={form} layout="vertical">
                        <div style={{ display: "flex", gap: 20, marginBottom: 16 }}>
                            <div style={{ flex: 1 }}>
                                <h4>Thông tin khách hàng</h4>
                                <p>
                                    <strong>Tên:</strong> {currentBooking?.userId?.full_name || "N/A"}
                                </p>
                                <p>
                                    <strong>Email:</strong> {currentBooking?.userId?.email || "N/A"}
                                </p>
                                <p>
                                    <strong>Điện thoại:</strong> {currentBooking?.userId?.phone || "N/A"}
                                </p>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4>Thông tin booking</h4>
                                <p>
                                    <strong>Loại:</strong>{" "}
                                    {currentBooking?.type === "room" ? "Phòng" : "Dịch vụ"}
                                </p>
                                <p>
                                    <strong>Ngày tạo:</strong>{" "}
                                    {currentBooking?.createdAt
                                        ? new Date(currentBooking.createdAt).toLocaleString()
                                        : "N/A"}
                                </p>
                                <p>
                                    <strong>Tổng tiền:</strong>{" "}
                                    {currentBooking?.price?.toLocaleString() || 0} VND
                                </p>
                            </div>
                        </div>

                        <Form.Item
                            label="Trạng thái booking"
                            name="status"
                            rules={[
                                { required: true, message: "Vui lòng chọn trạng thái" },
                            ]}
                        >
                            <Select>
                                <Select.Option value="pending">Chờ xử lý</Select.Option>
                                <Select.Option value="confirmed">Đã xác nhận</Select.Option>
                                <Select.Option value="canceled">Đã hủy</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="Trạng thái thanh toán"
                            name="paymentStatus"
                            rules={[
                                { required: true, message: "Vui lòng chọn trạng thái thanh toán" },
                            ]}
                        >
                            <Select>
                                <Select.Option value="pending">Chờ thanh toán</Select.Option>
                                <Select.Option value="paid">Đã thanh toán</Select.Option>
                                <Select.Option value="failed">Thất bại</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="Ghi chú" name="notes">
                            <Input.TextArea rows={3} />
                        </Form.Item>
                    </Form>
                </Modal>
            </ContentWrapper>
        </BookingContainer>
    );
};


export default ManageBooking;
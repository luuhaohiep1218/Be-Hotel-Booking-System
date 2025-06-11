import React from "react";
import { Card, Row, Col, Table, Progress, Button } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  BellOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import StaffSidebar from "../components/StaffSidebar";

// Styled components
const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f0f2f5;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "70px")};
`;

const Header = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const StatisticCard = styled(Card)`
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const TaskList = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Notifications = styled.div`
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StaffDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false); // Trạng thái mở/đóng sidebar

  // Dữ liệu mẫu cho các task
  const tasks = [
    {
      key: "1",
      task: "Kiểm tra phòng 101",
      status: "Đang chờ",
      progress: 30,
    },
    {
      key: "2",
      task: "Dọn dẹp phòng 102",
      status: "Đang tiến hành",
      progress: 60,
    },
    {
      key: "3",
      task: "Chuẩn bị phòng 103",
      status: "Hoàn thành",
      progress: 100,
    },
  ];

  // Cột của bảng task
  const taskColumns = [
    {
      title: "Công việc",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Tiến độ",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => <Progress percent={progress} size="small" />,
    },
  ];

  // Dữ liệu mẫu cho thông báo
  const notifications = [
    {
      key: "1",
      message: "Phòng 101 cần được dọn dẹp gấp",
      time: "10 phút trước",
    },
    {
      key: "2",
      message: "Khách hàng yêu cầu thêm gối",
      time: "30 phút trước",
    },
    {
      key: "3",
      message: "Phòng 103 đã sẵn sàng",
      time: "1 giờ trước",
    },
  ];

  return (
    <DashboardContainer>
      {/* Sidebar */}
      <StaffSidebar onToggle={setIsSidebarOpen} />

      {/* Nội dung chính */}
      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <Header>Dashboard Nhân viên</Header>

        {/* Thống kê nhanh */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <StatisticCard>
              <UserOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
              <h3>10</h3>
              <p>Phòng đang sử dụng</p>
            </StatisticCard>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <StatisticCard>
              <ClockCircleOutlined style={{ fontSize: "24px", color: "#faad14" }} />
              <h3>5</h3>
              <p>Phòng cần dọn dẹp</p>
            </StatisticCard>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <StatisticCard>
              <CheckCircleOutlined style={{ fontSize: "24px", color: "#52c41a" }} />
              <h3>20</h3>
              <p>Phòng sẵn sàng</p>
            </StatisticCard>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <StatisticCard>
              <BellOutlined style={{ fontSize: "24px", color: "#f5222d" }} />
              <h3>3</h3>
              <p>Thông báo mới</p>
            </StatisticCard>
          </Col>
        </Row>

        {/* Danh sách công việc */}
        <TaskList>
          <h2>
            <ClockCircleOutlined /> Công việc cần làm
          </h2>
          <Table
            dataSource={tasks}
            columns={taskColumns}
            pagination={false}
            rowKey="key"
          />
        </TaskList>

        {/* Thông báo */}
        <Notifications>
          <h2>
            <BellOutlined /> Thông báo
          </h2>
          {notifications.map((notification) => (
            <Card key={notification.key} style={{ marginBottom: "10px" }}>
              <p>{notification.message}</p>
              <small>{notification.time}</small>
            </Card>
          ))}
          <Button type="primary" icon={<BellOutlined />} style={{ marginTop: "10px" }}>
            Xem tất cả
          </Button>
        </Notifications>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default StaffDashboard;
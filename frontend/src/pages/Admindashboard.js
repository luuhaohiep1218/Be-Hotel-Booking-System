import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Navbar,
  Card,
  Button,
  Table,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useHotelBooking } from "../context/HotelBookingContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminSlidebar from "../components/AdminSlidebar";
import {
  PeopleFill,
  PersonCheckFill,
  PersonPlusFill,
  CurrencyDollar,
} from "react-bootstrap-icons";
import API from "../utils/axiosInstance";

const StyledNavbar = styled(Navbar)`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: #212529;
  color: white;
  height: 60px;
`;

const MainContent = styled.div`
  transition: margin-left 0.3s ease-in-out;
  margin-left: ${(props) => (props.sidebarOpen ? "250px" : "58px")};
  margin-top: 70px;
  padding: 20px;
  width: calc(100% - ${(props) => (props.sidebarOpen ? "250px" : "58px")});
`;

const StyledCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StatCard = styled(StyledCard)`
  background-color: ${(props) => props.bgcolor || "#fff"};
  color: ${(props) => props.textcolor || "#000"};
`;

const StatIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${(props) => props.bgcolor || "rgba(255, 255, 255, 0.2)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;

  svg {
    font-size: 24px;
    color: ${(props) => props.iconcolor || "#fff"};
  }
`;

const PercentageIndicator = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => (props.isPositive ? "#28a745" : "#dc3545")};
  font-size: 14px;
  margin-top: 5px;
`;

const RecentActivityTable = styled(Table)`
  th,
  td {
    padding: 12px 15px;
    vertical-align: middle;
  }

  tbody tr {
    transition: background-color 0.2s;

    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const StatusBadge = styled.span`
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background-color: ${(props) => {
    switch (props.status) {
      case "active":
        return "#d1e7dd";
      case "pending":
        return "#fff3cd";
      case "inactive":
        return "#f8d7da";
      default:
        return "#e9ecef";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "active":
        return "#0f5132";
      case "pending":
        return "#856404";
      case "inactive":
        return "#721c24";
      default:
        return "#495057";
    }
  }};
`;

const LoadingSpinner = styled(Spinner)`
  display: block;
  margin: 20px auto;
`;

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalHotels: 0,
    totalBookings: 0,
    thisMonth: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [userDistribution, setUserDistribution] = useState({
    USER: 0,
    STAFF: 0,
    MARKETING: 0,
    ADMIN: 0,
  });
  const [growthData, setGrowthData] = useState({
    percentage: 0,
    isPositive: true,
  });

  const { accessToken } = useHotelBooking();

  useEffect(() => {
    if (accessToken) {
      fetchDashboardData();
    } else {
      console.log("No access token available");
    }
  }, [accessToken]);

  // For debugging - log the token
  useEffect(() => {
    console.log(
      "Current access token:",
      accessToken ? "Token exists" : "No token"
    );
  }, [accessToken]);

  // Update the fetchDashboardData function to better handle API errors and provide more debugging information
  const fetchDashboardData = async () => {
    try {
      console.log("Fetching dashboard data...");

      if (!accessToken) throw new Error("No access token available");

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      };

      const statsResponse = await API.get("/admin/users/stats", axiosConfig);
      const recentUsersResponse = await API.get("/admin/users/recent", {
        ...axiosConfig,
        params: { limit: 5 },
      });

      const thisMonthResponse = await API.get("/admin/users/this-month", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setStats({
        totalUsers: statsResponse.data.totalUsers,
        activeUsers: statsResponse.data.activeUsers,
        totalHotels: stats.totalHotels,
        totalBookings: stats.totalBookings,
        thisMonth: thisMonthResponse.data.usersThisMonth,
      });

      setUserDistribution(statsResponse.data.userDistribution);
      setGrowthData(statsResponse.data.growth);
      setRecentUsers(recentUsersResponse.data.recentUsers);
    } catch (error) {
      console.error("❌ Failed to fetch dashboard data:", error);
      toast.error("Failed to load dashboard data. Using sample data instead.");
    }
  };

  const navbarStyle = {
    position: "fixed",
    zIndex: "100",
    width: "100%",
  };

  const styles = {
    adminTitle: {
      display: "inline-block",
      transition: "transform 0.3s ease-in-out",
      transform: isSidebarOpen ? "translateX(200px)" : "translateX(0)",
    },
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "completed":
        return "info";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  return (
    <div maxwidth="1920px">
      <ToastContainer position="top-right" autoClose={3000} />

      <AdminSlidebar onToggle={setIsSidebarOpen} />

      <StyledNavbar bg="dark" variant="dark" expand="lg" style={navbarStyle}>
        <Container>
          <Navbar.Brand
            href="#home"
            className="fs-3 fw-bold"
            style={styles.adminTitle}
          >
            ADMIN DASHBOARD
          </Navbar.Brand>
        </Container>
      </StyledNavbar>

      <div style={{ height: "60px" }} />

      <MainContent sidebarOpen={isSidebarOpen}>
        <Container fluid>
          <h2 className="mb-4">Dashboard Overview</h2>

          <>
            {/* Statistics Cards */}
            <Row className="mb-4">
              <Col md={6} lg={4}>
                <StatCard bgcolor="#4e73df" textcolor="#fff">
                  <Card.Body className="d-flex align-items-center">
                    <StatIcon>
                      <PeopleFill />
                    </StatIcon>
                    <div>
                      <h6 className="mb-0">TOTAL USERS</h6>
                      <h3 className="mb-0">{stats.totalUsers}</h3>
                    </div>
                  </Card.Body>
                </StatCard>
              </Col>

              <Col md={6} lg={4}>
                <StatCard bgcolor="#1cc88a" textcolor="#fff">
                  <Card.Body className="d-flex align-items-center">
                    <StatIcon>
                      <PersonCheckFill />
                    </StatIcon>
                    <div>
                      <h6 className="mb-0">ACTIVE USERS</h6>
                      <h3 className="mb-0">{stats.activeUsers}</h3>
                    </div>
                  </Card.Body>
                </StatCard>
              </Col>

              <Col md={6} lg={4}>
                <StatCard bgcolor="#f6c23e" textcolor="#fff">
                  <Card.Body className="d-flex align-items-center">
                    <StatIcon>
                      <PersonPlusFill />
                    </StatIcon>
                    <div>
                      <h6 className="mb-0">TOTAL REGISTER THIS MONTH</h6>
                      <h3 className="mb-0">{stats.thisMonth}</h3>
                    </div>
                  </Card.Body>
                </StatCard>
              </Col>
            </Row>

            {/* User Distribution */}
            <Row className="mb-4">
              <Col lg={6}>
                <StyledCard>
                  <Card.Header className="bg-white">
                    <h5 className="mb-0">User Distribution</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-4">
                      <div className="d-flex justify-content-between mb-1">
                        <span>Users</span>
                        <span>{userDistribution.USER}%</span>
                      </div>
                      <ProgressBar
                        variant="info"
                        now={userDistribution.USER}
                        className="mb-3"
                      />

                      <div className="d-flex justify-content-between mb-1">
                        <span>Staff</span>
                        <span>{userDistribution.STAFF}%</span>
                      </div>
                      <ProgressBar
                        variant="success"
                        now={userDistribution.STAFF}
                        className="mb-3"
                      />

                      <div className="d-flex justify-content-between mb-1">
                        <span>Marketing</span>
                        <span>{userDistribution.MARKETING}%</span>
                      </div>
                      <ProgressBar
                        variant="warning"
                        now={userDistribution.MARKETING}
                        className="mb-3"
                      />

                      <div className="d-flex justify-content-between mb-1">
                        <span>Admin</span>
                        <span>{userDistribution.ADMIN}%</span>
                      </div>
                      <ProgressBar
                        variant="danger"
                        now={userDistribution.ADMIN}
                      />
                    </div>

                    <div className="text-center mt-4">
                      <Link to="/admin">
                        <Button variant="primary">Manage Users</Button>
                      </Link>
                    </div>
                  </Card.Body>
                </StyledCard>
              </Col>

              <Col lg={6}>
                <StyledCard>
                  <Card.Header className="bg-white">
                    <h5 className="mb-0">Recent Users</h5>
                  </Card.Header>
                  <Card.Body>
                    {recentUsers.length > 0 ? (
                      <RecentActivityTable hover responsive>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map((user) => (
                            <tr key={user._id}>
                              <td>{user.full_name}</td>
                              <td>{user.role}</td>
                              <td>
                                <StatusBadge status={user.status}>
                                  {user.status}
                                </StatusBadge>
                              </td>
                              <td>{user.created_at}</td>
                            </tr>
                          ))}
                        </tbody>
                      </RecentActivityTable>
                    ) : (
                      <p className="text-center">No recent users found</p>
                    )}

                    <div className="text-center mt-3">
                      <Link to="/admin">
                        <Button variant="outline-primary">
                          View All Users
                        </Button>
                      </Link>
                    </div>
                  </Card.Body>
                </StyledCard>
              </Col>
            </Row>
          </>
        </Container>
      </MainContent>
    </div>
  );
};

export default AdminDashboard;

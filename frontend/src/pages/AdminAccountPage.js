import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import {
  Row,
  Col,
  Container,
  Navbar,
  Nav,
  Modal,
  Pagination,
  Form,
  InputGroup,
  Button,
  Table,
} from "react-bootstrap";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";
import { useHotelBooking } from "../context/HotelBookingContext";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../components/AdminSlidebar";

const StyledNavbar = styled(Navbar)`
  margin-bottom: 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
  justify-content: space-between;
  align-items: center;
`;

const SearchContainer = styled.div`
  margin-left: auto;
`;

const SearchInput = styled(Form.Control)`
  max-width: 300px;
  border-radius: 50px;
  padding: 10px 15px;
  border: 1px solid #ccc;
  outline: none;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SearchButton = styled(Button)`
  border-radius: 50px;
  background-color: #33c3f0;
  border: none;
  margin-left: 15px;
  &:hover {
    background-color: #1da1f2;
  }
`;

const StyledTable = styled(Table)`
  margin-top: 20px;
  border: 1px solid #dee2e6;
  thead th {
    background-color: #f8f9fa;
  }
  td,
  th {
    vertical-align: middle;
  }
`;


const navbarStyle = {
  position: "fixed",
  zIndex: "100",
  width: "100%",
};


const AdminManageAccount = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentRole, setCurrentRole] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const { accessToken, setAccessToken, setUser, user } = useHotelBooking();

  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "",
  });
  const usersPerPage = 10;

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentRole !== "ALL") {
      setNewUser((prev) => ({ ...prev, role: currentRole }));
    }
  }, [currentRole]);

  useEffect(() => {
    filterUsers();
  }, [users, currentRole, searchTerm]);

  const fetchUsers = async () => {
    try {
      const response = await API.get("/admin/users", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("❌ Failed to fetch users:", error);
    }
  };

  const handleCreateUser = async () => {
    try {
      await API.post("/admin/users", newUser, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      toast.success("🎉 Tạo tài khoản thành công!");
      setShowCreateModal(false);
      fetchUsers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("📧 Email đã tồn tại! Vui lòng nhập email khác.");
      } else {
        toast.error("⚠️ Đã có lỗi xảy ra! Vui lòng thử lại.");
      }
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (currentRole !== "ALL") {
      filtered = filtered.filter((user) => user.role === currentRole);
    }

    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.full_name?.toLowerCase().includes(lowerSearchTerm) ||
          user.email?.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmed) return;
      await API.delete(`/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      await fetchUsers();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleEdit = (user) => {
    if (!user || !user._id) {
      console.error("Invalid user data for editing");
      return;
    }

    setEditUser({
      ...user,
      role: user.role || "User",
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await API.put(
        `/admin/users/${editUser._id}`,
        { role: editUser.role },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setShowEditModal(false);
      fetchUsers();
    } catch (error) {
      console.error("❌ Failed to edit user:", error);
    }
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleLogout = async () => {
    try {
      console.warn("🚪 Đang logout...");

      // 🛑 Xóa accessToken & chuyển về trang login
      setAccessToken(null);
      sessionStorage.removeItem("accessToken"); // 🔄 Dùng sessionStorage thay vì localStorage
      setUser(null);
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("🔥 Lỗi logout:", error.message);
    }
  };


  const styles = {
    adminTitle: {
      display: "inline-block",
      transition: "transform 0.3s ease-in-out",
      transform: isSidebarOpen ? "translateX(200px)" : "translateX(0)",
    },
    animatedContainer: {
      transition: "transform 0.3s ease-in-out",
      transform: isSidebarOpen ? "translateX(200px)" : "translateX(0)",
      width: isSidebarOpen ? "calc(100% - 300px)" : "100%",
      marginLeft: "80px",
    },
  };
  return (
    <div maxwidth="1920px">
      <Sidebar onToggle={setIsSidebarOpen} />
      <Navbar bg="dark" variant="dark" expand="lg" style={navbarStyle}>
        <Container>
          <Navbar.Brand
            href="#home"
            className="fs-3 fw-bold"
            style={styles.adminTitle}
          >
            ADMIN PAGE
          </Navbar.Brand>
          <LogoutOutlined
            style={{ color: "white", fontSize: "24px" }}
            onClick={() => console.log("Logging out...")}
          />
        </Container>
      </Navbar>
      <div style={{ height: "80px" }} />
      <Container style={styles.animatedContainer}>
        <Navbar style={styles.styled}>
          <Nav variant="tabs" defaultActiveKey="ALL">
            {["ALL", "USER", "STAFF", "MARKETING"].map((role) => (
              <Nav.Item key={role}>
                <Nav.Link
                  eventKey={role}
                  onClick={() => setCurrentRole(role)}
                  active={currentRole === role}
                >
                  {role}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
          {currentRole === "STAFF" && (
            <SearchButton
              variant="primary"
              onClick={() => setShowCreateModal(true)}
            >
              Add Staff
            </SearchButton>
          )}
          {currentRole === "MARKETING" && (
            <SearchButton
              variant="primary"
              onClick={() => setShowCreateModal(true)}
            >
              Add Marketing
            </SearchButton>
          )}

          <SearchContainer>
            <Row>
              <InputGroup>
                <Col md={7}>
                  <SearchInput
                    placeholder="Nhập tên hoặc email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </Col>
                <Col>
                  <SearchButton
                    style={{ marginTop: "4px" }}
                    onClick={filterUsers}
                  >
                    Tìm kiếm
                  </SearchButton>
                </Col>
              </InputGroup>
            </Row>
          </SearchContainer>
        </Navbar>

        <StyledTable striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.full_name || "Unknown Name"}</td>
                <td>{user.email || "No email provided"}</td>
                <td>{user.role || "No role assigned"}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user._id)}
                    style={{ marginLeft: "10px" }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>

        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User Role</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Control
              as="select"
              value={editUser?.role}
              onChange={(e) =>
                setEditUser({ ...editUser, role: e.target.value })
              }
            >
              <option>USER</option>
              <option>STAFF</option>
              <option>MARKETING</option>
              <option>ADMIN</option>
            </Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveEdit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewUser({ ...newUser, full_name: e.target.value })
              }
            />
            <ToastContainer
              style={{ "z-index": "9999" }}
              position="top-right"
              autoClose={3000}
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
              style={{
                paddingRight: "40px", // Đảm bảo khoảng trống cho icon
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "66%",
                right: "24px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#6c757d",
                height: "20px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={currentRole}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="STAFF">STAFF</option>
              <option value="MARKETING">MARKETING</option>
            </Form.Control>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowCreateModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={handleCreateUser}>
              Create
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminManageAccount;

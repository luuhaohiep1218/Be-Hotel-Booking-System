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

  const [newUser, setNewUser] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "STAFF",
  });
  const usersPerPage = 10;

  const { accessToken } = useHotelBooking();

  useEffect(() => {
    fetchUsers();
  }, []);

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
      await API.post(
        "/admin/users",
        newUser,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setShowCreateModal(false);
      fetchUsers();
    } catch (error) {
      console.error("Failed to create user:", error);
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

  return (
    <Container>
      <StyledNavbar>
        <Nav variant="tabs" defaultActiveKey="ALL">
          {["ALL", "USER", "STAFF", "MARKETING", "ADMIN"].map((role) => (
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
                <SearchButton style={{marginTop:"4px"}} onClick={filterUsers}>Tìm kiếm</SearchButton>
              </Col>
            </InputGroup>
          </Row>
        </SearchContainer>
      </StyledNavbar>

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
                <Button variant="danger" onClick={() => handleDelete(user._id)}>
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
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
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
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          ></Form.Control>
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateUser}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminManageAccount;

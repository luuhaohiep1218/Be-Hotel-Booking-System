import React, { useEffect, useState } from "react";
import API from "../utils/axiosInstance";
import {
  Container,
  Table,
  Form,
  InputGroup,
  Button,
  Pagination,
  Navbar,
} from "react-bootstrap";
import styled from "styled-components";
import { Trash } from "react-bootstrap-icons";
import AdminSlidebar from "../components/AdminSlidebar";

import { toast } from "react-toastify";
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledInputGroup = styled(InputGroup)`
  max-width: 500px;
  width: 100%;
  background: #fff;
  border-radius: 50px;
  overflow: hidden;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchInput = styled(Form.Control)`
  border: none;
  padding: 12px 15px;
  font-size: 16px;
  outline: none;
  box-shadow: none;
  border-radius: 50px 0 0 50px;
`;

const SearchButton = styled(Button)`
  background-color: #22ACC1;
  border: none;
  border-radius: 0 50px 50px 0;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #007bff;
  }
`;

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

const AdminServicePage = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const servicesPerPage = 10;

  useEffect(() => {
    fetchServices();
  }, [searchTerm]);

  const fetchServices = async () => {
    try {
      const response = await API.get(`/admin/services?search=${searchTerm}`);
      setServices(response.data.services || []);
    } catch (error) {
      console.error("❌ Failed to fetch services:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;
    try {
      await API.delete(`/admin/services/${id}`);
      toast.success("✅ Dịch vụ đã được xóa thành công!");
      fetchServices();
    } catch (error) {
      toast.error("❌ Lỗi khi xóa dịch vụ!");
      console.error("Failed to delete service:", error);
    }
  };

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );
  const totalPages = Math.ceil(services.length / servicesPerPage);

  const styles = {
    adminTitle: {
      display: "inline-block",
      transition: "transform 0.3s ease-in-out",
      transform: isSidebarOpen ? "translateX(200px)" : "translateX(0)",
    },
  };

  const navbarStyle = {
    position: "fixed",
    zIndex: "100",
    width: "100%",
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " VND";
  };

  return (
    <div>
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
      <MainContent sidebarOpen={isSidebarOpen}>
        <Container>
          <h2 className="my-4">Quản Lý Dịch Vụ</h2>

          <SearchContainer>
            <StyledInputGroup>
              <SearchInput
                placeholder="🔍 Tìm kiếm dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchButton onClick={fetchServices}>Tìm kiếm</SearchButton>
            </StyledInputGroup>
          </SearchContainer>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tiêu đề</th>
                <th>Danh mục</th>
                <th>Giá</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentServices.map((service) => (
                <tr key={service._id}>
                  <td>{service._id}</td>
                  <td>{service.title}</td>
                  <td>{service.category}</td>
                  <td>{formatPrice(service.price)}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(service._id)}
                    >
                      <Trash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Pagination>
            {[...Array(totalPages)].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Container>
      </MainContent>
    </div>
  );
};

export default AdminServicePage;

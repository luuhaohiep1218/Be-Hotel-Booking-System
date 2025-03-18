import React, { useState, useEffect } from "react";
import Sidebar from "../components/MktSidebar";
import styled from "styled-components";
import API from "../utils/axiosInstance";
import { Pagination, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { Search } = Input;

// Styled Components
const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Footer = styled.footer`
  background: #343a40;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  margin-top: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
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

const SearchBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;

  .ant-input-affix-wrapper {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 8px 14px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:focus-within {
      border-color: #007bff;
      box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
    }
  }
`;

const CustomerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  flex-grow: 1;
  min-height: 60vh;
`;

const CustomerCard = styled.div`
  background: #fff; /* Nền trắng */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-left: 6px solid ${(props) => (props.active ? "#28a745" : "#dc3545")};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }

  h4 {
    color: #222; /* Chữ tiêu đề đen nhạt */
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: bold;
  }

  p {
    color: #333; /* Chữ chính đen nhẹ */
    font-size: 14px;
  }

  small {
    display: block;
    margin-top: 5px;
    color: #666; /* Chữ phụ xám đậm hơn */
    font-size: 12px;
  }

  .status {
    font-weight: bold;
    color: ${(props) =>
      props.active ? "#28a745" : "#dc3545"}; /* Xanh hoặc đỏ */
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 0;
  margin-top: auto;
  justify-content: flex-end;
`;

const MarketingCustomerList = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [pageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await API.get(
          `/user/listCustomer?page=${currentPage}&limit=${pageSize}`
        );
        console.log("Fetched Data:", response.data);
        const customerData = response.data.users.map((user) => ({
          ...user,
          createdAt: moment(user.createdAt).format("DD/MM/YYYY hh:mm A"),
          isActive: user.isActive ? "Active" : "Inactive",
        }));
        setCustomers(customerData);
        setFilteredCustomers(customerData);
        setTotalCustomers(response.data.totalUsers);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredCustomers(customers);
    } else {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filtered = customers.filter(
        (customer) =>
          customer.full_name.toLowerCase().includes(lowerCaseQuery) ||
          customer.phone.includes(lowerCaseQuery)
      );
      setFilteredCustomers(filtered);
    }
  }, [searchQuery, customers]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (page) => {
    console.log("Changing page to:", page);
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <Header>📋 Marketing Customer List</Header>

      <MainContent>
        <Sidebar onToggle={setIsSidebarOpen} />
        <ContentWrapper isSidebarOpen={isSidebarOpen}>
          <h2 style={{ color: "black" }}>Customer Information</h2>
          <SearchBar>
            <Input
              placeholder="Search by name or phone number..."
              prefix={<SearchOutlined style={{ color: "#888" }} />}
              allowClear
              value={searchQuery}
              onChange={handleSearch}
            />
          </SearchBar>

          <CustomerGrid>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <CustomerCard
                  key={customer._id}
                  active={customer.isActive === "Active"}
                >
                  <h4>Name: {customer.full_name}</h4>
                  <p>Email: {customer.email}</p>
                  <small>Phone: {customer.phone}</small>
                  <small className="status">Status: {customer.isActive}</small>
                  <small>Joined: {customer.createdAt}</small>
                </CustomerCard>
              ))
            ) : (
              <p>No customers found.</p>
            )}
          </CustomerGrid>

          <PaginationWrapper>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCustomers}
              onChange={handlePageChange}
            />
          </PaginationWrapper>
        </ContentWrapper>
      </MainContent>

      <Footer></Footer>
    </PageContainer>
  );
};

export default MarketingCustomerList;

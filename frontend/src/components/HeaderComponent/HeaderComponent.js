import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000; /* Đảm bảo luôn hiển thị trên các phần tử khác */
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1); /* Tạo hiệu ứng đổ bóng */
  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: flex; /* Giúp thẻ NavLink mở rộng theo padding */
  align-items: center; /* Căn giữa nội dung theo chiều dọc */
  justify-content: center;
  padding: 30px 15px; /* Tăng vùng nhấp chuột */
  color: black;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  text-decoration: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  border-radius: 5px; /* Giúp có cảm giác nút bấm mềm mại hơn */

  &:hover {
    color: #22acc1;
  }

  &.active {
    color: #22acc1;
  }

  &.active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0px; /* Điều chỉnh để gạch dưới nằm dưới cùng */
    width: 100%;
    height: 2px;
    background-color: #22acc1;
  }
`;

const HeaderComponent = () => {
  return (
    <>
      <StyledNavbar data-bs-theme="light">
        <Container>
          <Navbar.Brand as={NavLink} to="/" end>
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <StyledNavLink to="/service">DỊCH VỤ</StyledNavLink>
            <StyledNavLink to="/customer">KHÁCH HÀNG</StyledNavLink>
            <StyledNavLink to="/offer">ƯU ĐÃI</StyledNavLink>
          </Nav>
        </Container>
      </StyledNavbar>
    </>
  );
};

export default HeaderComponent;

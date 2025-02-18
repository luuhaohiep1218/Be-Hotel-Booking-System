import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo/logo-golodge.png";

const StyledNavbar = styled(Navbar)`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
`;

const StyledNav = styled(Nav)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 33px 10px;
  color: black;
  font-size: 16px;
  font-weight: 500;
  position: relative;
  text-decoration: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  border-radius: 5px;

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
    bottom: 0;
    width: 100%;
    height: 2px;
    background-color: #22acc1;
    border-radius: 4px;
  }
`;

const HeaderComponent = () => {
  return (
    <StyledNavbar data-bs-theme="light">
      <Container className="d-flex align-items-center justify-content-start">
        <Navbar.Brand as={NavLink} to="/" className="me-5">
          <Image src={logo} alt="Logo" width="80" height="80" rounded />
        </Navbar.Brand>
        <StyledNav>
          <StyledNavLink to="/service">DỊCH VỤ</StyledNavLink>
          <StyledNavLink to="/customer">KHÁCH HÀNG</StyledNavLink>
          <StyledNavLink to="/offer">ƯU ĐÃI</StyledNavLink>
        </StyledNav>
      </Container>
    </StyledNavbar>
  );
};

export default HeaderComponent;

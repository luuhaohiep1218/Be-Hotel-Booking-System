import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  padding: 10px;
  color: black; /* Màu mặc định */
  font-size: 16px;

  &.active {
    color: #ff5733; /* Màu khi active */
    font-weight: bold;
    border-bottom: 2px solid #ff5733;
  }
`;
const HeaderComponent = () => {
  return (
    <>
      <Navbar bg="white" data-bs-theme="light" className="p-4">
        <Container>
          <Navbar.Brand as={NavLink} to="/" end>
            Navbar
          </Navbar.Brand>
          <Nav className="me-auto">
            <StyledNavLink to="/">Home</StyledNavLink>
            <StyledNavLink to="/service">Features</StyledNavLink>
            <StyledNavLink to="/pricing">Pricing</StyledNavLink>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderComponent;

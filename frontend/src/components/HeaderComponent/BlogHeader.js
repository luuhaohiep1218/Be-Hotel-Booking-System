import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledNavbar = styled(Navbar)`
  background: rgb(225, 229, 234);
  border-radius: 8px;
  padding: 3px 14px;
  display: flex;
  justify-content: center;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
`;

const AllButton = styled(NavLink)`
  text-decoration: none;
  padding: 6px 14px;
  font-size: 13px;
  font-weight: 500;
  color: #666;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  width: 100px;
  text-align: center;

  &.active {
    background: white;
    border: 1px solid #ddd;
    color: rgb(17, 20, 21);
    font-weight: bold;
    padding: 6px 17px;
  }

  &:hover {
    color: rgb(22, 27, 28);
    background: rgb(255, 255, 255);
  }
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  width: 100px; /* Đặt chiều rộng cố định cho các nút */
  text-align: center;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 500;
  color: #666;
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  text-decoration: none;
  border: 1px solid transparent;

  &.active {
    background: white;
    border: 1px solid #ddd;
    color: rgb(17, 20, 21);
    font-weight: bold;
  }

  &:hover {
    background: rgb(240, 240, 240);
  }
`;

const HeaderComponent = () => {
  return (
    <StyledNavbar style={{ marginBottom: 50 }}>
      <Container>
        <Nav className="me-auto">
          <AllButton style={{ textDecoration: "none" }} to="/Blog">
            Tất cả
          </AllButton>
          <StyledNavLink style={{ textDecoration: "none" }} to="/onlyNew">
            Tin tức
          </StyledNavLink>
          <StyledNavLink style={{ textDecoration: "none" }} to="/onlyDiscount">
            Ưu đãi
          </StyledNavLink>
          <StyledNavLink style={{ textDecoration: "none" }} to="/onlyFeedbacks">
            Feed back
          </StyledNavLink>
        </Nav>
      </Container>
    </StyledNavbar>
  );
};

export default HeaderComponent;

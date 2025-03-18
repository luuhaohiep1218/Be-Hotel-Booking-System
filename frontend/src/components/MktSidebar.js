import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import styled from "styled-components";
import {
  BsGrid,
  BsPerson,
  BsPieChart,
  BsNewspaper,
  BsHeart,
  BsBoxArrowRight,
} from "react-icons/bs";

const SidebarWrapper = styled.div`
  width: ${(props) => (props.isOpen ? "250px" : "58px")};
  height: 100vh;
  background-color: #222;
  position: fixed;
  top: 0;
  left: 0;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 20px;
  color: white;
  overflow: hidden;
  z-index: 1000;
`;

const Logo = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-left: 15px;
  margin-bottom: 20px;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-left: 15px;
  margin-bottom: 20px;
`;

const StyledNav = styled(Nav)`
  width: 100%;
`;

const NavItem = styled(Nav.Item)`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledLink = styled(Nav.Link)`
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  padding: 12px 15px;
  text-decoration: none;
  font-size: 15px;
  transition: background 0.3s;
  &:hover {
    background-color: #444;
  }
`;

const Icon = styled.div`
  font-size: 22px;
  margin-right: 15px;
`;

const Label = styled.span`
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const Sidebar = ({ onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    onToggle(!isOpen); // Gửi trạng thái ra ngoài
  };

  const menuItems = [
    { to: "/mktdashboard", icon: <BsGrid />, label: "Dashboard" },
    { to: "/profile", icon: <BsPerson />, label: "User" },
    { to: "/mktCustomerList", icon: <BsPieChart />, label: "Customer List" },
    { to: "/mktpostlist", icon: <BsNewspaper />, label: "Post List" },
    { to: "/mktfeedbacklist", icon: <BsHeart />, label: "Feedback" },
  ];

  return (
    <SidebarWrapper isOpen={isOpen}>      
      <ToggleButton onClick={toggleSidebar}>☰</ToggleButton>
      <StyledNav>
        {menuItems.map((item, index) => (
          <NavItem key={index}>
            <StyledLink as={Link} to={item.to}>
              <Icon>{item.icon}</Icon>
              <Label isOpen={isOpen}>{item.label}</Label>
            </StyledLink>
          </NavItem>
        ))}
        <NavItem>
          <StyledLink as={Link} to="/logout">
            <Icon>
              <BsBoxArrowRight />
            </Icon>
            <Label isOpen={isOpen}>Logout</Label>
          </StyledLink>
        </NavItem>
      </StyledNav>
    </SidebarWrapper>
  );
};

export default Sidebar;

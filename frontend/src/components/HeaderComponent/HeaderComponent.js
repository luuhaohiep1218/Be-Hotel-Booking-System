import { Container, Image, Nav, Navbar } from "react-bootstrap";

import { LoginOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/logo/logo-golodge.png";
import { useHotelBooking } from "../../context/HotelBookingContext";
import API, { refreshAccessToken } from "../../utils/axiosInstance";

const StyledNavbar = styled(Navbar)`
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1000;
  background-color: white;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  display: flex;
  align-items: center;
`;

const StyledNav = styled(Nav)`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  flex-grow: 1;
  justify-content: center;
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

const CustomButton = styled.button`
  height: 40px;
  width: 170px;
  position: relative;
  background-color: transparent;
  cursor: pointer;
  border: 2px solid #22acc1;
  overflow: hidden;
  border-radius: 30px;
  color: #333;
  transition: all 0.5s ease-in-out;
  margin-left: auto;

  .btn-txt {
    z-index: 1;
    font-weight: 500;
  }

  &.type1::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    transition: all 0.5s ease-in-out;
    background-color: #22acc1;
    border-radius: 30px;
    visibility: hidden;
    height: 10px;
    width: 10px;
    z-index: -1;
  }

  &:hover {
    box-shadow: 1px 1px 200px #252525;
    color: #fff;
    border: none;
  }

  &.type1:hover::after {
    visibility: visible;
    transform: scale(100) translateX(2px);
  }
`;
const StyledLink = styled(Link)`
  text-decoration: none; /* Bỏ gạch chân */
  color: inherit; /* Giữ nguyên màu chữ theo bố cục */
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa icon và text */

  &:hover {
    color: #1890ff; /* Màu khi hover */
  }
`;
const StyledDiv = styled.div`
  text-decoration: none; /* Bỏ gạch chân */
  color: inherit; /* Giữ nguyên màu chữ theo bố cục */
  display: flex;
  align-items: center;
  gap: 8px; /* Khoảng cách giữa icon và text */
  cursor: pointer; /* Đổi con trỏ thành dạng clickable */

  &:hover {
    color: #1890ff; /* Màu khi hover */
  }
`;

const HeaderComponent = () => {
  const navigate = useNavigate();

  const { accessToken, setAccessToken, setUser } = useHotelBooking();

  const handleLogout = async () => {
    try {
      if (!accessToken) {
        console.warn("❌ Không có accessToken, thực hiện logout local.");
        setAccessToken(null);
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/login", { replace: true });
        return;
      }

      await API.post("/auth/logout", null, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      console.log("✅ API logout thành công.");
    } catch (error) {
      console.error("🔥 Lỗi logout:", error.response?.data || error.message);

      if (error.response?.status === 401) {
        console.log("🔄 Token hết hạn, thử refresh...");
        const newToken = await refreshAccessToken();

        if (newToken) {
          console.log("✅ Refresh thành công, tiếp tục logout...");
          await API.post("/auth/logout", null, {
            headers: { Authorization: `Bearer ${newToken}` },
          });
        } else {
          console.error("❌ Refresh token thất bại, bỏ qua API logout.");
        }
      }
    } finally {
      // 🛑 Xóa accessToken & chuyển về trang login
      setAccessToken(null);
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login", { replace: true });
    }
  };

  const logoutHand = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const items = [
    {
      label: (
        <StyledLink to={"/profile"}>
          <i className="bi bi-person-exclamation"></i>
          Profile
        </StyledLink>
      ),
      key: "0",
    },
    {
      label: (
        <StyledDiv onClick={handleLogout}>
          <LoginOutlined />
          Logout
        </StyledDiv>
      ),
      key: "1",
    },
  ];
  return (
    <>
      <StyledNavbar data-bs-theme="light">
        <Container className="d-flex align-items-center">
          <Navbar.Brand as={NavLink} to="/" className="me-5">
            <Image src={logo} alt="Logo" width="80" height="80" rounded />
          </Navbar.Brand>
          <StyledNav>
            <StyledNavLink to="/service">DỊCH VỤ</StyledNavLink>
            <StyledNavLink to="/us">VỀ CHÚNG TÔI</StyledNavLink>
            <StyledNavLink to="/room-list">ĐẶT PHÒNG</StyledNavLink>
            {accessToken && (
              <StyledNavLink to="/feedback">ĐÁNH GIÁ</StyledNavLink>
            )}
             <StyledNavLink to="/Blog">BLOG</StyledNavLink>
          </StyledNav>
          {accessToken ? (
            <>
              <Dropdown
                menu={{
                  items,
                }}
              >
                <Link onClick={(e) => e.preventDefault()}>
                  <Space>
                    <Avatar size={40} icon={<UserOutlined />} />
                  </Space>
                </Link>
              </Dropdown>
            </>
          ) : (
            <NavLink to="/login">
              <CustomButton className="button type1">
                <span className="btn-txt">Đăng nhập</span>
              </CustomButton>
            </NavLink>
          )}
        </Container>
      </StyledNavbar>
    </>
  );
};

export default HeaderComponent;

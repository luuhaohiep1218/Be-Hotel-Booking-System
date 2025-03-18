import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import styled from "styled-components";
import logo from "../../assets/logo/logo-footer.png";

// Styled Components
const FooterWrapper = styled.footer`
  background-color: #111827; /* Màu nền tối */
  color: #ffffff;
  padding: 40px 0;
`;

const FooterLogo = styled.img`
  max-width: 180px;
  margin-bottom: 20px;
`;

const FooterHeading = styled.h5`
  font-size: 16px;
  font-weight: bold;
  color: #a1a1aa;
  margin-bottom: 15px;
`;

const FooterText = styled.p`
  font-size: 14px;
  color: #e5e7eb;
  margin-bottom: 10px;
`;

const FooterLink = styled(Link)`
  // Use Link instead of a
  display: block;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s ease;

  &:hover {
    color: #22acc1; /* Màu vàng khi hover */
  }
`;

const FooterComponent = () => {
  return (
    <FooterWrapper>
      <Container>
        <Row>
          {/* Cột 1: Logo + Thông tin công ty */}
          <Col md={4}>
            <FooterLogo src={logo} alt="Logo" />
            <FooterText>Công ty TNHH Du Lịch và Dịch Vụ GoLodge</FooterText>
            <FooterText>
              Phòng 321, Tòa nhà Beta, Đại học FPT Hà Nội, Thạch Hòa, Thạch Thất, Hà Nội
            </FooterText>
            <FooterText>Mã số doanh nghiệp: 0110376372</FooterText>
          </Col>

          {/* Cột 2: Giới thiệu */}
          <Col md={3}>
            <FooterHeading>GIỚI THIỆU</FooterHeading>
            <FooterLink to="#">Về chúng tôi</FooterLink>
            <FooterLink to="#">Điều khoản và điều kiện</FooterLink>
            <FooterLink to="#">Chính sách riêng tư</FooterLink>
            <FooterLink to="#">Hướng dẫn sử dụng</FooterLink>
            <FooterLink to="#">Hình thức thanh toán</FooterLink>
          </Col>

          {/* Cột 3: Điểm đến */}
          <Col md={2}>
            <FooterHeading>ĐIỂM ĐẾN</FooterHeading>
            <FooterLink to="#">Vịnh Hạ Long</FooterLink>
            <FooterLink to="#">Vịnh Lan Hạ</FooterLink>
            <FooterLink to="#">Đảo Cát Bà</FooterLink>
          </Col>

          {/* Cột 4: Du thuyền */}
          <Col md={3}>
            <FooterHeading>DU THUYỀN</FooterHeading>
            <FooterLink to="/customer">Blog</FooterLink>
            <FooterLink to="#">Quy định chung và lưu ý</FooterLink>
            <FooterLink to="#">Câu hỏi thường gặp</FooterLink>
          </Col>
        </Row>
      </Container>
    </FooterWrapper>
  );
};

export default FooterComponent;

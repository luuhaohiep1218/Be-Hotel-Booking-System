import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaGem, FaStar, FaDollarSign, FaLock } from "react-icons/fa";
import styled from "styled-components";

// Màu chủ đạo
const primaryColor = "#22ACC1";

// Styled Components
const Section = styled.section`
  margin-top: 40px;
`;

const Title = styled.h4`
  font-weight: bold;
  color: ${primaryColor};
`;

const FeatureCard = styled(Card)`
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: none;
  transition: transform 0.2s ease-in-out;
  height: 100%;
  &:hover {
    transform: translateY(-5px);
  }
`;

const IconCircle = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${primaryColor}33; /* Màu xanh nhạt 20% */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const ContactInfo = styled.p`
  font-size: 16px;
  line-height: 1.6;
`;
const SlashContainer = styled.div`
  display: flex;
  gap: 10px; /* Khoảng cách giữa các dấu */
  align-items: center;
  padding: 20px;
  marginbottom: "100px";
`;

const Slash = styled.span`
  font-size: 16px; /* Kích thước */
  font-weight: bold;
  color: #22acc1; /* Màu xanh chủ đạo */
  opacity: 1; /* Độ mờ */
  transform: rotate(15deg); /* Nghiêng dấu */
`;

const AboutUS = () => {
  const features = [
    {
      icon: <FaGem size={30} color={primaryColor} />,
      title: "Đội ngũ chuyên nghiệp, tâm huyết",
      text: "Chúng tôi có đội ngũ nhân viên kinh nghiệm, tâm huyết, luôn lắng nghe những thắc mắc...",
    },
    {
      icon: <FaStar size={30} color={primaryColor} />,
      title: "Sản phẩm phong phú",
      text: "Tại địa chỉ website: https://mixivivu.com, du khách có thể dễ dàng tìm thấy các sản phẩm du lịch chất lượng...",
    },
    {
      icon: <FaDollarSign size={30} color={primaryColor} />,
      title: "Mức giá hấp dẫn",
      text: "Mixi Vivu cam kết cung cấp dịch vụ với mức giá tốt nhất, cùng nhiều chương trình khuyến mãi...",
    },
    {
      icon: <FaLock size={30} color={primaryColor} />,
      title: "Bảo mật thông tin",
      text: "Mọi thông tin cá nhân của khách hàng đều được bảo mật tuyệt đối, tạo sự an tâm khi sử dụng dịch vụ...",
    },
  ];

  return (
    <Container style={{ margin: "5%" }}>
      <Container className="my-5" style={{ maxWidth: "80%" }}>
        <h2 className="fw-bold ">Về Golodge</h2>
        <SlashContainer>
          {Array.from({ length: 10 }).map((_, index) => (
            <Slash key={index}>/</Slash>
          ))}
        </SlashContainer>
        <Section>
          <Title>1. Chúng tôi là Golodge</Title>
          <p style={{ fontSize: "20px", lineHeight: "1.6" }}>
            Golodge.com là sản phẩm chính thức của Công ty TNHH Du lịch và Dịch
            vụ Golodge. Chúng tôi cung cấp các dịch vụ du lịch đa dạng và chất
            lượng cao.Với niềm đam mê du lịch, ưa khám phá, chúng tôi đã cùng
            nhau xây dựng một website – nơi mà khách hàng sẽ dễ dàng lựa chọn
            cho mình cũng như những người thân yêu chuyến nghỉ dưỡng đáng nhớ.
          </p>
        </Section>

        <Section>
          <Title>2. Tại sao chọn chúng tôi?</Title>
          <Row className="g-4">
            {features.map((feature, index) => (
              <Col md={6} key={index}>
                <FeatureCard>
                  <Card.Body>
                    <IconCircle>{feature.icon}</IconCircle>
                    <Card.Title className="fw-bold">{feature.title}</Card.Title>
                    <Card.Text>{feature.text}</Card.Text>
                  </Card.Body>
                </FeatureCard>
              </Col>
            ))}
          </Row>
        </Section>

        <Section>
          <Title>3. Sản phẩm dịch vụ</Title>
          <ul style={{ fontSize: "20px", lineHeight: "2" }}>
            <li>
              <strong>Đặt phòng khách sạn và resort:</strong> Hệ thống khách sạn
              và resort cao cấp, đáp ứng mọi nhu cầu lưu trú.
            </li>
            <li>
              <strong>Ẩm thực:</strong> Dịch vụ ẩm thực đa dạng, từ món ăn địa
              phương đến ẩm thực quốc tế.
            </li>
            <li>
              <strong>Spa & Massage:</strong> Trải nghiệm thư giãn với các liệu
              pháp spa chuyên nghiệp.
            </li>
            <li>
              <strong>Dịch vụ giặt ủi:</strong> Giặt ủi nhanh chóng, sạch sẽ,
              giúp bạn luôn có trang phục hoàn hảo.
            </li>
            <li>
              <strong>Tour du lịch:</strong> Các tour du lịch hấp dẫn, khám phá
              những địa điểm tuyệt đẹp.
            </li>
          </ul>
        </Section>

        <Section>
          <Title>4. Liên hệ với chúng tôi</Title>
          <FeatureCard style={{ width: "70%", fontSize: "20px" }}>
            <Card.Body>
              <ContactInfo style={{ fontSize: "16px" }}>
                <strong>Công ty TNHH Du lịch và Dịch vụ Golodge</strong>
                <br />
                Địa chỉ: Phòng 321, Tòa nhà Beta, Đại học FPT Hà Nội, Thạch Hòa,
                Thạch Thất, Hà Nội
                <br />
                Điện thoại: 022222222
                <br />
                Email: Golodge@gmail.com
              </ContactInfo>
            </Card.Body>
          </FeatureCard>
        </Section>
      </Container>
    </Container>
  );
};

export default AboutUS;

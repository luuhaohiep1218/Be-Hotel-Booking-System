import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

// Styled Components
const BlogTitle = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PublishDate = styled.p`
  font-size: 14px;
  color: gray;
  margin-bottom: 20px;
`;

const BlogSection = styled.div`
  margin-bottom: 20px;
`;

const BlogText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333;
`;

const BlogImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
  margin: 10px 0;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const BlogDetail = () => {
  // Dữ liệu blog
  const blogData = {
    title: "Khám phá Vịnh Hạ Long - Kỳ quan thiên nhiên thế giới",
    date: "Ngày đăng: 17/02/2025",
    sections: [
      {
        text: "Vịnh Hạ Long là một trong những điểm du lịch nổi tiếng nhất Việt Nam, được UNESCO công nhận là Di sản thiên nhiên thế giới. Với hàng ngàn hòn đảo đá vôi, cảnh quan tuyệt đẹp và hệ sinh thái đa dạng, nơi đây thu hút hàng triệu du khách mỗi năm.",
        image: "https://source.unsplash.com/800x500/?halongbay",
      },
      {
        text: "Bên cạnh vẻ đẹp tự nhiên, Vịnh Hạ Long còn có rất nhiều hoạt động du lịch hấp dẫn như chèo thuyền kayak, khám phá hang động, và thưởng thức hải sản tươi ngon.",
        image: "https://source.unsplash.com/800x500/?boat",
      },
      {
        text: "Ngoài ra, bạn cũng có thể trải nghiệm du thuyền trên Vịnh Hạ Long vào buổi tối để tận hưởng không khí lãng mạn và vẻ đẹp lung linh của vịnh khi lên đèn.",
        image: "https://source.unsplash.com/800x500/?sunset",
      },
    ],
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <BlogTitle>{blogData.title}</BlogTitle>
          <PublishDate>{blogData.date}</PublishDate>

          {blogData.sections.map((section, index) => (
            <BlogSection key={index}>
              <BlogText>{section.text}</BlogText>
              <BlogImage src={section.image} alt={`Blog Image ${index + 1}`} />
            </BlogSection>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogDetail;

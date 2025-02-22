import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Đảm bảo nội dung giãn cách hợp lý */
  height: 100%; /* Giúp đảm bảo các card có cùng chiều cao */
  border-radius: 20px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border: none;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
  background-color: #fff;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    transform: translateY(-5px);
  }
`;
const NewsImage = styled.img`
  width: 92%;
  height: auto;
  object-fit: cover;
  border-radius: 20px; /* Bo tròn ảnh */
  display: block;
  margin: 12px auto 0;
`;

const NewsBody = styled.div`
  flex-grow: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Căn cách đều giữa title, text và date */
`;

const NewsTitle = styled.h5`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  flex-grow: 1;
`;
const NewsText = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  flex-grow: 1;
  margin-bottom: 8px;
`;

const NewsDate = styled.p`
  font-size: 0.85rem;
  color: #888;
  margin-top: auto;
`;

const NewsItem = ({ item }) => {
  return (
    <Col md={6} lg={4} className="mb-4">
      <Link
        style={{ textDecoration: "none", color: "inherit" }}
        to={
          item.category === "internalNews"
            ? `/news/${item.id}`
            : item.category === "discounts"
            ? `/discount/${item.id}`
            : item.category === "feedbacks"
            ? `/feedback/${item.id}`
            : "#"
        }
      >
        <NewsCard>
          <NewsImage src={item.image} alt={item.title} />

          <NewsBody>
            <NewsTitle>{item.title}</NewsTitle>
            <NewsText>{item.summary}</NewsText>
            <NewsDate>{item.date}</NewsDate>
          </NewsBody>
        </NewsCard>
      </Link>
    </Col>
  );
};

export default NewsItem;

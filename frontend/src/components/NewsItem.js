import React from "react";
import { Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NewsCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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
  border-radius: 20px;
  display: block;
  margin: 12px auto 0;
`;

const NewsBody = styled.div`
  flex-grow: 1;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const NewsExtra = styled.p`
  font-size: 0.85rem;
  color: #555;
  margin-top: 5px;
  font-style: italic;
`;

const NewsItem = ({ item }) => {
  console.log(item.sections?.[0]?.image);
  return (
    <Col md={6} lg={4} className="mb-4">
      <Link style={{ textDecoration: "none", color: "inherit" }} to={item._id}>
        <NewsCard>
          <NewsImage
            src={
              item.sections?.[0]?.image ||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={item.title}
          />
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

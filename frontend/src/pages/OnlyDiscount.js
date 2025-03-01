import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PopularNews from "../components/PopularNews";

const OnlyDiscount = () => {
  const [internalNews, setInternalNews] = useState([]);
  const [discount, setDiscount] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [internalResponse, discountResponse] = await Promise.all([
          axios.get("http://localhost:3001/internalNews"),
          axios.get("http://localhost:3001/discounts"),
        ]);

        setInternalNews(
          internalResponse.data.map((item) => ({
            ...item,
            id: `internal-${item.id}`,
          }))
        );

        setDiscount(
          discountResponse.data.map((item) => ({
            ...item,
            id: `discount-${item.id}`,
          }))
        );
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container style={{ padding: "40px" }}>
      <PopularNews news={internalNews} />
      <BlogHeader />
      <Row>
        <Col style={{ padding: "43px" }}>
          <NewsList news={discount} />
        </Col>
      </Row>
    </Container>
  );
};

export default OnlyDiscount;

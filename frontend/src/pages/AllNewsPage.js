import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PopularNews from "../components/PopularNews";

const AllNewsPage = () => {
  const [allNews, setAllNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [internalResponse, discountsResponse, feedbacksResponse] =
          await Promise.all([
            axios.get("http://localhost:3001/internalNews"),
            axios.get("http://localhost:3001/discounts"),
            axios.get("http://localhost:3001/feedbacks"),
          ]);

        const combinedNews = [
          ...internalResponse.data.map((item) => ({
            ...item,
            id: `internal-${item.id}`,
          })),
          ...discountsResponse.data.map((item) => ({
            ...item,
            id: `discount-${item.id}`,
          })),
          ...feedbacksResponse.data.map((item) => ({
            ...item,
            id: `feedback-${item.id}`,
          })),
        ].sort((a, b) => new Date(b.date) - new Date(a.date));

        console.log(" Dữ liệu lấy về:", combinedNews.length, "bài viết");

        setAllNews(combinedNews);
      } catch (error) {
        console.error(" Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container style={{ padding: "40px" }}>
      <PopularNews news={allNews} />
      <BlogHeader />
      <Row>
        <Col style={{ padding: "20px" }}>
          <NewsList news={allNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default AllNewsPage;

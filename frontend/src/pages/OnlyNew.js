import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PopularNews from "../components/PopularNews";

const OnlyNew = () => {
  const [internalNews, setInternalNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/internalNews");
        setInternalNews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy internalNews:", error);
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
          <NewsList news={internalNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default OnlyNew;

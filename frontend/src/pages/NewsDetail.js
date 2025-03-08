import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import API from "../utils/axiosInstance";
import NewsItemDetail from "../components/NewsItemDetail";

const NewsDetail = () => {
  const { blogId } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (!blogId) {
      console.error("ID không hợp lệ:", blogId);
      return;
    }

    const fetchBlogs = async () => {
      const response = await API.get(`/blog/${blogId}`);
      setNewsItem(response.data);
    };
    fetchBlogs();
  }, [blogId]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <NewsItemDetail newsItem={newsItem} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;

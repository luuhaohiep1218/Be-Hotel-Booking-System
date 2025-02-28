import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsItemDetail from "../components/NewsItemDetail";

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("ID không hợp lệ:", id);
      return;
    }

    console.log("Fetching news detail with ID:", id);
    
    axios
      .get(`http://localhost:3001/internalNews/${id}`)
      .then((response) => {
        console.log("API Response:", response.data);
        setNewsItem(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy internalNews:", error);
      });
  }, [id]);

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

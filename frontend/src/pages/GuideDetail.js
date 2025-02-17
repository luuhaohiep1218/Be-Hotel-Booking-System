// src/pages/NewsDetail.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsItemDetail from "../components/NewsItemDetail";
import Sidebar from "../components/Sidebar";

const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [travelGuide, setTravelGuide] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/travelGuide")
      .then((response) => {
        setTravelGuide(response.data);
      })
      .catch((error) => {
        console.error("Lỗi travelGuide:", error);
      });
    axios
      .get(`http://localhost:3001/travelGuide/${id}`)
      .then((response) => {
        setNewsItem(response.data);
      })
      .catch((error) => {
        console.error("Lỗi travelGuide:", error);
      });
  }, [id]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row md={9}>
        <Col>
          <NewsItemDetail newsItem={newsItem} />
        </Col>
        <Col md={3}>
          <Sidebar news={travelGuide} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;

// src/pages/NewsDetail.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsItemDetail from "../components/NewsItemDetail";


const NewsDetail = () => {
  const { id } = useParams();
  const [newsItem, setNewsItem] = useState(null);


  useEffect(() => {
   
    axios
      .get(`http://localhost:3001/discounts/${id}`)
      .then((response) => {
        setNewsItem(response.data);
      })
      .catch((error) => {
        console.error("Lỗi discounts:", error);
      });
  }, [id]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row md={9}>
        <Col>
          <NewsItemDetail newsItem={newsItem} />
        </Col>
       
      </Row>
    </Container>
  );
};

export default NewsDetail;

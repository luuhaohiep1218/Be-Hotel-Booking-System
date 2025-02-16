// src/pages/NewsDetail.jsx
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import NewsItemDetail from "../components/NewsItemDetail";
import PopularPost from "../components/PopularNews";
import Sidebar from "../components/Sidebar";

const NewsDetail = () => {
  const { id } = useParams(); 
  const [newsItem, setNewsItem] = useState(null);
  const [internalNews, setInternalNews] = useState([]);
  
  useEffect(() => {

    axios.get("http://localhost:3001/internalNews")
      .then((response) => {
        setInternalNews(response.data);
      })
      .catch((error) => {
        console.error("Lỗi internalNews:", error);
      });
    axios
      .get(`http://localhost:3001/internalNews/${id}`)
      .then((response) => {
        setNewsItem(response.data);   
    })
    .catch((error) => {
      console.error("Lỗi internalNews:", error);
    });
  }, [id]);

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row  md={9}>
        <Col>
        <NewsItemDetail newsItem={newsItem} />
        </Col>
        <Col  md={3} >       
        <PopularPost popu={internalNews} />
        <Sidebar news={internalNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewsDetail;

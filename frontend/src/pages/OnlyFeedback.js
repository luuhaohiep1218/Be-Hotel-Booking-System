import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PopularNews from "../components/PopularNews";


const OnlyFeedbacks = () => {
    const [internalNews, setInternalNews] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {
    axios
    .get("http://localhost:3001/feedbacks")
    .then((response) => {
      setFeedbacks(response.data);
    })
    .catch((error) => {
      console.error("Lỗi khi lấy feedbacks:", error);
    });
  axios
    .get("http://localhost:3001/internalNews")
    .then((response) => {
      setInternalNews(response.data);
      
    })
    .catch((error) => {
      console.error("Lỗi khi lấy internalNews:", error);
    });

      
  }, []);

  return (
    <Container style={{ padding:"40px"}}>
      <PopularNews  news={internalNews}/>
    <BlogHeader/>
      <Row>
        <Col style={{ padding:"43px"}}>
          
          <NewsList news={feedbacks} />

          
        </Col>
      </Row>
    </Container>
  );
};

export default OnlyFeedbacks;

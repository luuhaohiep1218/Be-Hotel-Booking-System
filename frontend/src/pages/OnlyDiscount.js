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
    axios
      .get("http://localhost:3001/discounts")
      .then((response) => {
        setDiscount(response.data);
      })
      .catch((error) => {
        console.error("Lỗi discounts:", error);
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
          
          <NewsList news={discount} />

          
        </Col>
      </Row>
    </Container>
  );
};

export default OnlyDiscount;

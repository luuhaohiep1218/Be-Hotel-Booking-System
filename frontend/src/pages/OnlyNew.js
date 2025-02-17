import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import Sidebar from "../components/Sidebar";
import PopularPost from "../components/PopularNews";


const OnlyNew = () => {
  const [internalNews, setInternalNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/internalNews")
      .then((response) => {
        setInternalNews(response.data);
      })
      .catch((error) => {
        console.error("Lỗi internalNews:", error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Row>
          <Col>
            <h3
              style={{
                textAlign: "center",
                marginTop: 50,
                marginBottom: 10,
                color: "#22ACC1",
              }}
            >
              TIN NỘI BỘ
            </h3>
            <div
              style={{
                height: "3px",
                width: "8%",
                backgroundColor: "#22ACC1",
                margin: "0 auto",
              }}
            ></div>
            <div
              style={{
                height: "3px",
                width: "25%",
                backgroundColor: "#22ACC1",
                margin: "0 auto",
                marginBottom: 4,
                marginTop: 4,
              }}
            ></div>
            <div
              style={{
                height: "3px",
                width: "8%",
                backgroundColor: "#22ACC1",
                margin: "0 auto",
                marginBottom: 20,
              }}
            ></div>
          </Col>
        </Row>
        <Col md={9}>
          <PopularPost popu={internalNews} />
          <NewsList news={internalNews} />
        </Col>
        <Col md={3} style={{ marginBottom: 20 }}>
          <Sidebar news={internalNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default OnlyNew;

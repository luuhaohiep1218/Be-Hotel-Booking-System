import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import Sidebar from "../components/Sidebar";

const NewsPage = () => {
  const [internalNews, setInternalNews] = useState([]);
  const [travelGuide, setTravelGuide] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/internalNews")
      .then((response) => {
        setInternalNews(response.data);
      })
      .catch((error) => {
        console.error("Lỗi internalNews:", error);
      });

    axios
      .get("http://localhost:3001/travelGuide")
      .then((response) => {
        setTravelGuide(response.data);
      })
      .catch((error) => {
        console.error("Lỗi travelGuide:", error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col md={9}>
          <h3
            style={{
              textAlign: "center",
              marginTop: 80,
              marginBottom: 20,
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
              marginBottom: 30,
            }}
          ></div>

          <NewsList news={internalNews} />

          <h3
            style={{
              textAlign: "center",
              marginTop: 100,
              marginBottom: 20,
              color: "#22ACC1",
            }}
          >
            Sổ tay du lịch
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
              marginBottom: 30,
            }}
          ></div>

          <NewsList news={travelGuide} />
        </Col>
        <Col md={3} style={{ marginTop: 50, marginBottom: 20 }}>
          <Sidebar news={internalNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewsPage;

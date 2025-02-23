import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import NewsList from "../components/NewsList";
import PopularPost from "../components/PopularNews";
import Sidebar from "../components/Sidebar";
import newsData from "../data.json";

const NewsPage = () => {
  const [internalNews, setInternalNews] = useState([]);
  const [travelGuide, setTravelGuide] = useState([]);

  useEffect(() => {
    setInternalNews(newsData.internalNews);
    setTravelGuide(newsData.travelGuide);
  }, []);

  return (
    <Container>
      <Row>
        <Col md={9}>
          <h4
            style={{
              textAlign: "center",
              marginTop: 80,
              marginBottom: 20,
              color: "darkred",
            }}
          >
            TIN NỘI BỘ
          </h4>
          <div
            style={{
              height: "3px",
              width: "8%",
              backgroundColor: "darkred",
              margin: "0 auto",
            }}
          ></div>
          <div
            style={{
              height: "3px",
              width: "25%",
              backgroundColor: "darkred",
              margin: "0 auto",
              marginBottom: 4,
              marginTop: 4,
            }}
          ></div>
          <div
            style={{
              height: "3px",
              width: "8%",
              backgroundColor: "darkred",
              margin: "0 auto",
              marginBottom: 30,
            }}
          ></div>

          <NewsList news={internalNews} />

          <h4
            style={{
              textAlign: "center",
              marginTop: 100,
              marginBottom: 20,
              color: "darkred",
            }}
          >
            Sổ tay du lịch
          </h4>
          <div
            style={{
              height: "3px",
              width: "8%",
              backgroundColor: "darkred",
              margin: "0 auto",
            }}
          ></div>
          <div
            style={{
              height: "3px",
              width: "25%",
              backgroundColor: "darkred",
              margin: "0 auto",
              marginBottom: 4,
              marginTop: 4,
            }}
          ></div>
          <div
            style={{
              height: "3px",
              width: "8%",
              backgroundColor: "darkred",
              margin: "0 auto",
              marginBottom: 30,
            }}
          ></div>

          <NewsList news={travelGuide} />
        </Col>
        <Col md={3} style={{ marginTop: 10, marginBottom: 20 }}>
          <PopularPost popu={internalNews} />
          <Sidebar news={internalNews} />
        </Col>
      </Row>
    </Container>
  );
};

export default NewsPage;

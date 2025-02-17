import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import Sidebar from "../components/Sidebar";
import PopularPost from "../components/PopularNews";


const OnlyGuide = () => {
  
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
              SỔ TAY DU LỊCH
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
          <PopularPost popu={travelGuide} />
          <NewsList news={travelGuide} />
        </Col>
        <Col md={3} style={{ marginBottom: 20 }}>
          <Sidebar news={travelGuide} />
        </Col>
      </Row>
    </Container>
  );
};

export default OnlyGuide;

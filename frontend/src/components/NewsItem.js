import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewsItem = ({ item }) => {
  return (
    <Col md={6} lg={4} className="mb-4">
      <Card
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.title}
          style={{
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <Card.Body
          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <Row
            className="mb-2"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Col xs={6}>
              <Card.Text
                style={{
                  color: "#ff7700",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {item.location}
              </Card.Text>
            </Col>
            <Col xs={6} style={{ textAlign: "right" }}>
              <Card.Text style={{ color: "#666", fontSize: "0.9rem" }}>
                {item.date}
              </Card.Text>
            </Col>
          </Row>

          <Card.Title
            style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}
          >
            <Link
              to={
                item.category === "internalNews"
                  ? `/news/${item.id}`
                  : `/guide/${item.id}`
              }
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.title}
            </Link>
          </Card.Title>
          <Card.Text
            style={{ fontSize: "0.95rem", color: "#555", flexGrow: 1 }}
          >
            {item.summary}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default NewsItem;

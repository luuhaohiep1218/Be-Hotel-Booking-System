import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import CardComponent from "../components/CardComponent";

// Styled Components
const Title = styled.h1`
  text-align: center;
  font-weight: bold;
  padding: 20px 0;
  position: relative;
`;

const UnderlineShort = styled.div`
  width: 150px;
  height: 3px;
  background-color: #22acc1;
  margin: 0 auto;
  margin-top: 5px;
`;
const UnderlineLong = styled.div`
  width: 350px;
  height: 3px;
  background-color: #22acc1;
  margin: 0 auto;
  margin-top: 5px;
`;

const OfferPage = () => {
  return (
    <Container>
      <Title>ƯU ĐÃI</Title>
      <UnderlineShort />
      <UnderlineLong />
      <UnderlineShort />
      <Row className="mt-4">
        <Col lg={12}>
          <CardComponent />
        </Col>
      </Row>
    </Container>
  );
};

export default OfferPage;

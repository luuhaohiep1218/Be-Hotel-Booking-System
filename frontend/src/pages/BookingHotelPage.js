import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Banner from '../components/Banner';
import CardComponent from "../components/CardComponent";
function BookingHotelPage() {
  return (
    <Container>
      <Banner />
      <Row className="mt-5">
        <Col lg={12} className="mt-5">
          <Row className="mb-4 mt-5">
                <Col lg={6}>
              <h4 className="fw-bold " style ={{ fontSize: "30px" }}>
                Khám phá và trải nghiệm <br /> 
                tất cả dịch vụ tuyệt vời nhất <br /> 
                từ các khách sạn trên mọi miền <br /> 
                đất nước cùng Go Lodge.
              </h4>
              <img 
                src="/path-to-your-image.jpg" // Đổi đường dẫn thành hình ảnh thật
                alt="Khám phá dịch vụ khách sạn"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Col>
            <Col lg={6}>
              <h1>ĐẶT PHÒNG KHÁCH SẠN</h1>
            </Col>
          </Row>
          <CardComponent />
        </Col>
      </Row>
    </Container>
  )
}

export default BookingHotelPage

import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";

// Styled Components
const StyledContainer = styled(Container)`
  position: absolute;
  width: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  border-radius: 24px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -240px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  z-index: 10;
`;

const StyledForm = styled(Form)`
  padding: 20px;
  background-color: transparent;
  box-shadow: none;
`;

const StyledButton = styled(Button)`
  height: 40px;
  border-radius: 20px;
  border: 1px solid #ccc;
  color: #6c757d;
`;

const RoomSearchBox = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    type: "",
    services: "",
    location: "",
    beds: 1,
    price: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({
      ...prevParams,
      [name]: name === "beds" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchParams);
  };

  return (
    <StyledContainer className="mt-5">
      <h2 className="text-center">Bạn lựa chọn phòng nào?</h2>
      <p className="text-center text-muted">Hơn 100 phòng sang giá tốt đang chờ bạn</p>
      <StyledForm onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Tên phòng</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nhập tên phòng"
                value={searchParams.name}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Loại phòng</Form.Label>
              <Form.Control as="select" name="type" value={searchParams.type} onChange={handleChange}>
                <option value="">Chọn loại</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Luxury">Luxury</option>
                <option value="Superior">Superior</option>

              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Dịch vụ</Form.Label>
              <Form.Control
                type="text"
                name="services"
                placeholder="WiFi, Hồ bơi..."
                value={searchParams.services}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Vị trí</Form.Label>
              <Form.Control as="select" name="location" value={searchParams.location} onChange={handleChange}>
                <option value="">Chọn vị trí</option>
                <option value="biển">Biển</option>
                <option value="thành phố">Thành phố</option>
                <option value="biển và thành phố">Biển và Thành phố</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Số giường</Form.Label>
              <Form.Control
                type="number"
                name="beds"
                min="1"
                placeholder="Số giường"
                value={searchParams.beds}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Giá</Form.Label>
              <Form.Control as="select" name="price" value={searchParams.price} onChange={handleChange}>
                <option value="">Chọn khoảng giá</option>
                <option value="<500">Nhỏ hơn 500</option>
                <option value="500-3000">Từ 500 đến 3000</option>
                <option value=">3000">Lớn hơn 3000</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Trạng thái</Form.Label>
              <Form.Control as="select" name="status" value={searchParams.status} onChange={handleChange}>
                <option value="">Chọn trạng thái</option>
                <option value="Available">Còn trống</option>
                <option value="Booked">Đã đặt</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <StyledButton type="submit" variant="info">
            Tìm phòng
          </StyledButton>
        </div>
      </StyledForm>
    </StyledContainer>
  );
};

export default RoomSearchBox;

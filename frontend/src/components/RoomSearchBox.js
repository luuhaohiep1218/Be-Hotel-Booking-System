import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

// Styled Components
const RoomSearchContainer = styled.div`
  position: absolute;
  width: 70%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 25px;
  border-radius: 16px;
  left: 50%;
  transform: translateX(-50%);
  bottom: -350px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc;
  z-index: 10;
  transition: all 0.3s ease-in-out;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    position: relative;
    bottom: auto;
    width: 100%;
    transform: none;
    padding: 20px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const SubTitle = styled.p`
  text-align: center;
  color: #6c757d;
  font-size: 14px;
  margin-bottom: 20px;
`;

const StyledForm = styled(Form)`
  background-color: transparent;
`;

const FormRow = styled(Row)`
  margin-bottom: 15px;
`;

const FormInput = styled(Form.Control)`
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const FormSelect = styled(Form.Select)`
  border-radius: 12px;
  border: 1px solid #ccc;
  padding: 10px;
`;

const SearchButton = styled(Button)`
  width: 100%;
  height: 45px;
  border-radius: 12px;
  background-color: #007bff;
  border: none;
  font-weight: bold;
  transition: 0.3s;

  &:hover {
    background-color: #0056b3;
  }
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

  const isMobile = useMediaQuery({ maxWidth: 768 });

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
    <RoomSearchContainer className={isMobile ? "mobile-position" : ""}>
      <Title>Bạn lựa chọn phòng nào?</Title>
      <SubTitle>Hơn 100 phòng sang giá tốt đang chờ bạn</SubTitle>

      <StyledForm onSubmit={handleSubmit}>
        <FormRow>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Tên phòng</Form.Label>
              <FormInput
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
              <FormSelect name="type" value={searchParams.type} onChange={handleChange}>
                <option value="">Chọn loại</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
                <option value="Luxury">Luxury</option>
                <option value="Superior">Superior</option>
              </FormSelect>
            </Form.Group>
          </Col>
        </FormRow>

        <FormRow>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Dịch vụ</Form.Label>
              <FormInput
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
              <FormSelect name="location" value={searchParams.location} onChange={handleChange}>
                <option value="">Chọn vị trí</option>
                <option value="biển">Biển</option>
                <option value="thành phố">Thành phố</option>
                <option value="biển và thành phố">Biển và Thành phố</option>
              </FormSelect>
            </Form.Group>
          </Col>
        </FormRow>

        <FormRow>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Số giường</Form.Label>
              <FormInput
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
              <FormSelect name="price" value={searchParams.price} onChange={handleChange}>
                <option value="">Chọn khoảng giá</option>
                <option value="<500">Nhỏ hơn 500</option>
                <option value="500-3000">Từ 500 đến 3000</option>
                <option value=">3000">Lớn hơn 3000</option>
              </FormSelect>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Trạng thái</Form.Label>
              <FormSelect name="status" value={searchParams.status} onChange={handleChange}>
                <option value="">Chọn trạng thái</option>
                <option value="Available">Còn trống</option>
                <option value="Booked">Đã đặt</option>
              </FormSelect>
            </Form.Group>
          </Col>
        </FormRow>

        <div className="text-center mt-3">
          <SearchButton type="submit">Tìm phòng</SearchButton>
        </div>
      </StyledForm>
    </RoomSearchContainer>
  );
};

export default RoomSearchBox;

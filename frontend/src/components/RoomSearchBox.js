import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const RoomSearchBox = ({ onSearch }) => {
  const style = {
    position: "absolute",
    transform: "translateX(-50%)",
    width: "60%",
    left: "50%",
    
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: "20px",
    borderRadius: "24px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    bottom: "-126px",
    border: "1px solid #ccc",
  };
  const styleInput = {
    height: "40px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    paddingLeft: "26px",
  }
  const styleButton = {
    height: "40px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    placeholder: {
      color: "#6c757d",
    }
  }
  return (
    <Container className="mt-5" style={style}>
      <h2 className="text-center">Bạn lựa chọn phòng nào?</h2>
      <p className="text-center text-muted">
        Hơn 100 phòng sang giá tốt đang chờ bạn
      </p>
      <Form className="p-3 border rounded bg-shadow w-100">
<Row className="align-items-center">
          <Col md={4} style={{ position: "relative" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6c757d",
              }}
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <Form.Control
              style={styleInput}
              type="text"
              placeholder="Nhập tên khách sạn"
            />
          </Col>


          <Col md={3} style={{ position: "relative" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#6c757d",
                pointerEvents: "none", // Ngăn không cho SVG ảnh hưởng đến tương tác
              }}
            >
              <path d="M5.7 15C4.03377 15.6353 3 16.5205 3 17.4997C3 19.4329 7.02944 21 12 21C16.9706 21 21 19.4329 21 17.4997C21 16.5205 19.9662 15.6353 18.3 15M12 9H12.01M18 9C18 13.0637 13.5 15 12 18C10.5 15 6 13.0637 6 9C6 5.68629 8.68629 3 12 3C15.3137 3 18 5.68629 18 9ZM13 9C13 9.55228 12.5523 10 12 10C11.4477 10 11 9.55228 11 9C11 8.44772 11.4477 8 12 8C12.5523 8 13 8.44772 13 9Z"></path>
            </svg>
            <Form.Select style={styleInput}>
              <option>Tất cả kiểu phòng </option>
              <option>Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
            </Form.Select>
          </Col>
          <Col md={3} style={{ position: "relative" }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                  color: "#6c757d",
                pointerEvents: "none", // Ngăn không cho SVG ảnh hưởng đến tương tác
              }}width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 10V9.91667C15 8.85812 14.1419 8 13.0833 8H11C9.89543 8 9 8.89543 9 10C9 11.1046 9.89543 12 11 12H13C14.1046 12 15 12.8954 15 14C15 15.1046 14.1046 16 13 16H10.9583C9.87678 16 9 15.1232 9 14.0417V14M12 17.5V6.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#101828" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            <Form.Select style={styleInput}>
              <option>Tất cả mức giá</option>
              <option>500K - 1 Triệu</option>
              <option>1 Triệu - 3 Triệu</option>
            </Form.Select>
          </Col>
          <Col md={2}>
            <Button variant="info" style={{ height: "40px", borderRadius: "20px" }} className="w-100">
              Tìm kiếm
            </Button>
          </Col>
        </Row>
      </Form>

    </Container>
  );
};

export default RoomSearchBox;
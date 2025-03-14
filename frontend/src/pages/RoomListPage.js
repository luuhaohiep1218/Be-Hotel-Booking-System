import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import images from "../assets/images/pages.jpg";
import background from "../assets/images/section-background.jpg";
import Banner from "../components/Banner";
import CardComponent from "../components/CardComponent";
import ModalBookingRoom from "../components/ModalComponent/ModalBookingRoom";
import RoomSearchBox from "../components/RoomSearchBox";
import { useHotelBooking } from "../context/HotelBookingContext";
import { RoomContext } from "../context/RoomContext";

const SectionBackground = styled.div`
  background-image: url(${background});
  background-color: rgba(34, 172, 193, 0.1);
  backdrop-filter: blur(5px);
  background-size: cover;
  background-position: left center;
  background-repeat: no-repeat;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Heading = styled.h4`
  font-size: 30px;
  margin-left: 20px;
  line-height: 28px;
  font-weight: 500;
`;

const Paragraph = styled.p`
  font-size: 16px;
  line-height: 28px;
  font-weight: 500;
  padding-left: 20px;
`;

const StyledButton = styled(Button)`
  width: 150px;
  height: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #22acbf;
  color: #fff;
  border: none;
  &:hover {
    background-color: #1a8fa0;
  }
`;

function RoomListPage() {
  const navigate = useNavigate();
  const { rooms, filteredRooms, loading, error, handleFilterRooms } = useContext(RoomContext);
  const { user } = useHotelBooking();
  const [showModal, setShowModal] = useState(false);;
  const [selectedRoom, setSelectedRoom] = useState(null);
 console.log(filteredRooms);
  const handleBookRoom = (room) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedRoom(room);
      setShowModal(true);
    }
  };
  
 const ModalComponent = selectedRoom ? (
  <ModalBookingRoom show={showModal} handleClose={() => setShowModal(false)} room={rooms} filteredRooms={filteredRooms} />
) : null;
  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container fluid className="p-0 m-0">
      <Row className="p-2 m-2">
        <Banner />
        <RoomSearchBox onSearch={handleFilterRooms} />
        <Row className="mt-10" style={{ marginTop: "210px" }}>
          {Array.isArray(filteredRooms) && filteredRooms.length > 0 && (
            <Col lg={12} className="mt-5">
            {filteredRooms.length > 0 ? (
              <CardComponent data={filteredRooms} pageSize={4}>
                {(rooms) => (
                  <div className="d-flex pt-3">
                    <Button
                      type="default"
                      shape="round"
                      size="middle"
                      icon={<ArrowRightOutlined />}
                      disabled={rooms.status === "đã đặt"}
                      style={{ marginRight: "10px" }}
                      onClick={() => handleBookRoom(rooms)}
                    >
                      Đặt Phòng Ngay
                    </Button>
                  </div>
                )}
              </CardComponent>
            ) : (
              <p>Không có phòng nào khả dụng</p>
            )}
            {ModalComponent}
          </Col>
          )}
          
        </Row>
         <SectionBackground>
          <Col lg={6} className="m-0 p-0">
            <Heading>Khám phá Sự đặc sắc<br />và Cập nhật tin tức mới nhất</Heading>
            <img src={images} alt="Khám phá tin tức" style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }} />
          </Col>
          <Col lg={6} className="mt-0">
            <Paragraph>Những dịch vụ hấp dẫn cùng nhiều thông tin cần thiết cho chuyến nghỉ dưỡng của bạn</Paragraph>
          </Col>
          <StyledButton
            type="default"
            shape="round"
            size="middle"
            icon={<ArrowRightOutlined />}
            onClick={() => navigate("/blog")}
          >
            Xem tất cả
          </StyledButton>
        </SectionBackground>
      </Row>
    </Container>
  );
}

export default RoomListPage;

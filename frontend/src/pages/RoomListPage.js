import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import images from "../assets/images/pages.jpg";
import background from "../assets/images/section-background.jpg";
import Banner from "../components/Banner";
import CardComponent from "../components/CardComponent";
import ModalBookingRoom from "../components/ModalComponent/ModalBookingRoom";
import RoomSearchBox from "../components/RoomSearchBox";
import { useHotelBooking } from "../context/HotelBookingContext";
import API from "../utils/axiosInstance";

const styles = {
  sectionBackground: {
    backgroundImage: `url(${background})`,
    backgroundColor: "rgba(34, 172, 193, 0.1)",
    backdropFilter: "blur(5px)",
    backgroundSize: "cover",
    backgroundPosition: "left center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    height: "50vh",
  },
  backGround: {
    width: "100%",
    height: "50vh",
  },
  heading: {
    fontSize: "30px",
    marginLeft: "20px",
    lineHeight: "28px",
    fontWeight: "500",
  },
  paragraph: {
    fontSize: "16px",
    lineHeight: "28px",
    fontWeight: "500",
    paddingLeft: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    width: "150px",
    height: "40px",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#22ACBF",
    color: "#fff",
  },
};

function RoomListPage() {
  console.log("RoomListPage");
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { user } = useHotelBooking();

  console.log(user);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await API.get(`/room`);
        if (JSON.stringify(rooms) !== JSON.stringify(response.data.rooms)) {
          setRooms(response.data.rooms);
          setFilteredRooms(response.data.rooms);
        }
        setLoading(false);
      } catch (err) {
        setError("Lỗi khi tải dữ liệu!");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []); // Chỉ chạy một lần khi component mount

  const handleBookRoom = (room) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedRoom(room);
      setShowModal(true);
    }
  };
const handleFilterRooms = useCallback(
    (filters) => {
      let filtered = rooms.filter((room) => {
        return (
          (filters.name === "" || room.name.toLowerCase().includes(filters.name.toLowerCase())) &&
          (filters.type === "" || room.type === filters.type) &&
          (filters.services === "" || room.services.toLowerCase().includes(filters.services.toLowerCase())) &&
          (filters.location === "" || room.location === filters.location) &&
          (filters.status === "" || room.status === filters.status) &&
          (filters.beds === "" || room.beds >= parseInt(filters.beds)) &&
          (filters.price === "" ||
            (filters.price === "<500" && room.price < 500) ||
            (filters.price === "500-3000" && room.price >= 500 && room.price <= 3000) ||
            (filters.price === ">3000" && room.price > 3000))
        );
      });
      setFilteredRooms(filtered);
    },
    [rooms]
  );

  useEffect(() => {
  handleFilterRooms({
    name: "",
    type: "",
    services: "",
    location: "",
    status: "",
    beds: "",
    price: "",
  });
}, [rooms, handleFilterRooms]);
 

  const ModalComponent = useMemo(() => {
    return selectedRoom ? (
      <ModalBookingRoom show={showModal} handleClose={() => setShowModal(false)} room={selectedRoom} />
    ) : null;
  }, [selectedRoom, showModal]);

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container fluid className="p-0 m-0">
      <Row className="p-2 m-2">
        <Banner />
        <RoomSearchBox onSearch={handleFilterRooms} />
        <Row className="mt-10" style={{ marginTop: "120px" }}>
          <Col lg={12} className="mt-5">
            <Row className="mb-5">
              <Col lg={6}>
                <h4 className="fw-bold pl-3" style={styles.heading}>
                  Khám phá và trải nghiệm <br />
                  tất cả dịch vụ tuyệt vời nhất <br />
                  từ khách sạn đẳng cấp nhất <br />
                  Việt Nam Go Lodge.
                </h4>
                <img src={images} alt="Khám phá dịch vụ khách sạn" style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }} />
              </Col>
              <Col lg={6} style={styles.paragraph}>
                <p>
                  Không gian nghỉ dưỡng sang trọng, tiện nghi và hiện đại cùng dịch vụ chuyên nghiệp,
                  Golodge tự hào mang đến những trải nghiệm hoàn hảo cho kỳ nghỉ của bạn, giúp bạn tận hưởng từng
                  khoảnh khắc một cách đáng nhớ và trọn vẹn nhất!
                </p>
              </Col>
            </Row>
            {filteredRooms.length > 0 ? (
              <CardComponent data={filteredRooms} pageSize={4}>
                {(room) => (
                  <div className="d-flex pt-3">
                    <Button
                      type="default"
                      shape="round"
                      size="middle"
                      icon={<ArrowRightOutlined />}
                      disabled={room.status === "đã đặt"}
                      style={{ marginRight: "10px" }}
                      onClick={() => handleBookRoom(room)}
                    >
                      Đặt Phòng Ngay
                    </Button>
                    <Link to={`/room-detail/${room._id}`}>Xem chi tiết</Link>
                  </div>
                )}
              </CardComponent>
            ) : (
              <p>Không có phòng nào khả dụng</p>
            )}
            {ModalComponent}
          </Col>
          <Row className="p-0 m-0" style={styles.backGround}>
            <Col lg={6} className="mt-5">
              <h4 className="fw-bold pr-3" style={styles.heading}>
                Khám phá Sự đặc sắc
                <br />
                và Cập nhật tin tức mới nhất
              </h4>
              <img src={images} alt="Khám phá tin tức" style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }} />
            </Col>
            <Col lg={6} style={styles.paragraph} className="mt-5">
              <p>Những dịch vụ hấp dẫn cùng nhiều thông tin cần thiết cho chuyến nghỉ dưỡng của bạn</p>
            </Col>
            <div style={styles.buttonContainer}>
              <Button type="default" shape="round" size="middle" icon={<ArrowRightOutlined />} style={styles.button} onClick={() => navigate("/blog")}>
                Xem tất cả
              </Button>
            </div>
          </Row>
        </Row>
      </Row>
    </Container>
  );
}

export default RoomListPage;

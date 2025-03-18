import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../utils/axiosInstance";
import { Image } from "antd";
import ModalBookingService from "../components/ModalComponent/ModalBookingService";

const styles = {
  card: {
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    border: "none",
    width: "80%",
    height: "100%",
    padding: "15px",
    marginLeft: "12%",
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "20px",
  },
  ratingBadge: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "rgba(255, 193, 7, 0.9)",
    color: "white",
    fontSize: "12px",
    padding: "5px 10px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  location: {
    fontSize: "14px",
    color: "#6c757d",
    marginBottom: "5px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "8px",
  },
  details: {
    fontSize: "13px",
    color: "#6c757d",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
  },
  price: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#000",
  },
  button: {
    backgroundColor: "#17a2b8",
    color: "white",
    borderRadius: "20px",
    padding: "8px 15px",
    fontSize: "14px",
    border: "none",
  },
  titlecontainer: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    maxWidth: "90%",
    margin: "auto",
    textAlign: "left",
    padding: "50px 0",
  },
  titleheading: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  titletext: {
    color: "#6c757d",
    maxWidth: "450px",
    lineHeight: "1.6",
  },
  underline: {
    width: "50px",
    height: "3px",
    background: "#63c5da",
    marginTop: "5px",
  },
  buttonmore: {
    marginTop: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  recontainer: {
    marginTop: "60px",
    background:
      "url('https://mixivivu.com/section-background.png') no-repeat center center/cover",
    backgroundColor: "#f3ffff",
    padding: "50px 0",
    textAlign: "center",
    width: "100%",
    borderRadius: "16px",
  },
  retitle: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  resubtitle: {
    fontSize: "16px",
    color: "#6c757d",
    marginBottom: "30px",
  },
  carouselItem: {
    marginTop: "10px",
    marginBottom: "20px",
  },
  reviewBox: {
    maxWidth: "800px",
    margin: "auto",
    background: "white",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    height: "260px",
  },
  quoteIcon: {
    color: "#17a2b8",
    fontSize: "24px",
    fontWeight: "bold",
  },
  reviewTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
    height: "40px",
  },
  reviewText: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "1.6",
    height: "84px",
  },
  reviewerName: {
    marginTop: "15px",
    fontWeight: "bold",
    fontSize: "16px",
    height: "60px",
  },
  reviewerList: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: "20px",
    gap: "10px",
  },
  reviewerItem: {
    background: "#fff",
    padding: "8px 15px",
    borderRadius: "20px",
    fontSize: "14px",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  roomContainer: {
    textAlign: "center",
    background:
      "url('https://mixivivu.com/section-background.png') no-repeat center center/cover",
    padding: "50px 0",
    height: "800px",
    backgroundColor: "#f3ffff",
  },
  tiroomContainer: {
    width: "50%",
  },
  roomTitle: {
    fontWeight: "bold",
    color: "#17a2b8",
  },
  roomSubtitle: {
    marginBottom: "20px",
    color: "#333",
  },
  roomCard: {
    border: "none",
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
    height: "240px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  roomImage: {
    height: "240px",
    objectFit: "cover",
    transition: "transform 0.3s ease-in-out",
  },
  roomOverlay: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    background: "rgba(0, 0, 0, 0.5)",
    padding: "15px",
    opacity: 0,
    transition: "opacity 0.3s ease-in-out",
  },
  roomOverlayHover: {
    opacity: 1,
  },
  roomImageHover: {
    transform: "scale(1.05)",
  },
  tiroomName: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    margin: "10px",
  },
  roomButton: {
    marginTop: "20px",
    backgroundColor: "transparent",
    border: "1px solid #17a2b8",
    color: "#17a2b8",
    padding: "10px 20px",
    fontSize: "12px",
    transition: "background-color 0.3s, color 0.3s",
    borderRadius: "100px",
  },
  roomButtonHover: {
    color: "white",
    backgroundColor: "#17a2b8",
  },
};

const HomePage = () => {
  const navigate = useNavigate();

  const [roomProminent, setRoomProminent] = useState([]);
  const [serviceProminent, setServiceProminent] = useState([]);
  const [feedbackProminent, setFeedbackProminent] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isManualSelect, setIsManualSelect] = useState(false);
  const [selectedService, setSelectedService] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomResponse, serviceResponse, feedbackResponse] =
          await Promise.all([
            API.get("/room?limit=4&sort=+quantityLeft"),
            API.get("/service?limit=6&sort=-rating"),
            API.get("/feedback/list-feedbacks?limit=5&sort=-rating"),
          ]);

        setRoomProminent(roomResponse.data.rooms);
        setServiceProminent(serviceResponse.data.services);
        setFeedbackProminent(feedbackResponse.data.feedbacks);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      if (!isManualSelect) {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % feedbackProminent.length
        );
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [feedbackProminent, isManualSelect, serviceProminent, roomProminent]);

  const formatCurrency = (amount) => {
    return `${Number(amount).toLocaleString("vi-VN", {})}đ`;
  };

  const handleSelectReviewer = (name) => {
    const foundIndex = feedbackProminent.findIndex(
      (review) => review.user === name
    );
    if (foundIndex !== -1) {
      setCurrentIndex(foundIndex);
      setIsManualSelect(true);
    }
  };
  const handleSelectedService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="text-center py-5" style={styles.roomContainer}>
        <Container style={styles.tiroomContainer}>
          <h2 style={styles.roomTitle}>HỆ THỐNG PHÒNG CỦA GOLODGE</h2>
          <p style={styles.roomSubtitle}>
            Chúng tôi luôn sẵn sàng phục vụ quý khách tại những điểm đến phù hợp
            với nhu cầu của quý khách!
          </p>
          <Row className="g-3">
            {roomProminent.map((room) => (
              <Col key={room._id} md={6} sm={6} xs={12}>
                <Card
                  style={styles.roomCard}
                  className="text-white"
                  onMouseEnter={() => setHoverIndex(room._id)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  <Card.Title
                    style={styles.tiroomName}
                  >{`${room.name.toUpperCase()}`}</Card.Title>
                  <Card.Img
                    src={room.image}
                    alt={room.name}
                    style={{
                      ...styles.roomImage,
                      ...(hoverIndex === room._id ? styles.roomImageHover : {}),
                    }}
                  ></Card.Img>
                  <Card.ImgOverlay
                    style={{
                      ...styles.roomOverlay,
                      ...(hoverIndex === room._id
                        ? styles.roomOverlayHover
                        : {}),
                    }}
                  >
                    <Card.Title
                      style={styles.roomName}
                    >{`${room.name.toUpperCase()}`}</Card.Title>
                    <Card.Text
                      style={styles.roomCount}
                    >{`Phòng ${room.type}`}</Card.Text>
                    <Card.Text
                      style={styles.roomDes}
                    >{`Mô tả : ${room.description}`}</Card.Text>
                  </Card.ImgOverlay>
                </Card>
              </Col>
            ))}
          </Row>
          <Button
            style={styles.roomButton}
            onMouseOver={(e) => {
              e.target.style.backgroundColor =
                styles.roomButtonHover.backgroundColor;
              e.target.style.color = styles.roomButtonHover.color;
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor =
                styles.roomButton.backgroundColor;
              e.target.style.color = styles.roomButton.color;
            }}
            onClick={() => navigate("/room-list")}
          >
            XEM TẤT CẢ
          </Button>
        </Container>
      </div>
      <Container style={styles.bigcontainer}>
        <div style={styles.titlecontainer}>
          <div>
            <h1 style={styles.titleheading}>Dịch vụ nổi bật</h1>
            <h1 style={styles.titleheading}>của chúng tôi</h1>
            <div style={styles.underline}></div>
          </div>
          <p style={styles.titletext}>
            Tận hưởng sự xa hoa và đẳng cấp tối đa trên du thuyền mới nhất và
            phổ biến nhất. Khám phá một hành trình tuyệt vời đưa bạn vào thế
            giới của sự sang trọng, tiện nghi và trải nghiệm không thể quên.
          </p>
        </div>
        <Row>
          {serviceProminent.map((service) => (
            <Col key={service.id} xs={12} sm={6} lg={4} className="mb-4">
              <Card style={styles.card}>
                <div style={styles.imageContainer}>
                  <Card.Img
                    style={styles.image}
                    variant="top"
                    src={service.images?.[0]}
                    alt={service.title}
                  />
                  <div style={styles.ratingBadge}>{service.rating}</div>
                </div>
                <Card.Body>
                  <Card.Title style={styles.title}>{service.title}</Card.Title>
                  <Card.Text style={styles.details}>
                    {service.summary}
                  </Card.Text>
                  <div style={styles.footer}>
                    <span style={styles.price}>
                      {formatCurrency(service.price)} / khách
                    </span>
                    <Button
                      style={styles.button}
                      onClick={() => handleSelectedService(service)}
                    >
                      Đặt ngay
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
        <div style={styles.buttonmore}>
          <Button
            variant="light"
            style={styles.button}
            onClick={() => navigate("/service")}
          >
            <span className="text-gray-800">Xem tất cả Dịch vụ</span>
            <i className="fas fa-arrow-right ml-2"></i>
          </Button>
        </div>
      </Container>

      <div style={styles.recontainer}>
        <h2 style={styles.retitle}>Đánh giá từ những người đã trải nghiệm</h2>
        <p style={styles.resubtitle}>
          Khách hàng chia sẻ về những kỷ niệm tuyệt vời trên chuyến du lịch với
          chúng tôi.
        </p>

        <Carousel
          activeIndex={currentIndex}
          onSelect={(selectedIndex) => setCurrentIndex(selectedIndex)}
          interval={4000}
          controls={false}
          indicators={false}
          fade
        >
          {feedbackProminent.map((feedback) => (
            <Carousel.Item key={feedback._id} style={styles.carouselItem}>
              <div style={styles.reviewBox}>
                <span style={styles.quoteIcon}>““</span>
                <h4 style={styles.reviewTitle}>{feedback.comment}</h4>
                <div>
                  {feedback.images.map((img, index) => (
                    <Image
                      key={index}
                      src={img}
                      alt={`Review ${index}`}
                      width="15%"
                      style={{ borderRadius: "10px", marginBottom: "10px" }}
                    />
                  ))}
                </div>
                <p style={styles.reviewerName}>{feedback.user}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
        <div style={styles.reviewerList}>
          {feedbackProminent.map((feedback) => (
            <span
              key={feedback._id}
              style={styles.reviewerItem}
              onClick={() => handleSelectReviewer(feedback.user)}
            >
              {feedback.user}
            </span>
          ))}
        </div>
      </div>
      <ModalBookingService
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        service={selectedService}
      />
    </div>
  );
};
export default HomePage;

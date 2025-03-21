import { Form, Input, Rate, Space } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Carousel, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoomContext } from "../context/RoomContext"; // Using RoomContext to fetch data

const RoomDetail = () => {
  const roomId = localStorage.getItem("roomId"); // Get roomId from localStorage
  console.log("Received roomId:", roomId); // Log roomId immediately

  const { roomDetails, loading, error, getRoomDetails } = useContext(RoomContext); // Fetch roomDetails from RoomContext

  const [review, setReview] = useState({ name: "", email: "", phone: "", rating: 0, comment: "" });
  const [form] = Form.useForm();

  const hasLogged = useRef(false);
  useEffect(() => {
    if (!hasLogged.current) {
      console.log("Log roomId once:", roomId); // Log roomId only once during the first render
      hasLogged.current = true; // Set to true after the first log
    }

    if (roomId) {
      getRoomDetails(roomId); // Fetch room details when roomId changes
    }
  }, [roomId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const onFinish = (values) => {
    console.log('Form Values:', values);
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!roomDetails) {
    return <div>Không tìm thấy phòng</div>;
  }

  const { TextArea } = Input;

  const styles = {
    titlecontainer: {
      display: "flex",
      alignItems: "flex-start",
      maxWidth: "100%",
      textAlign: "left",
    },
    titleheading: {
      fontSize: "32px",
      fontWeight: "bold",
    },
    feedback: {
      paddingBottom: "10px",
      borderBottom: "1px solid #ccc",
    },
    titleFeedback: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      maxWidth: "100%",
    },
    formFeedback: {
      display: "flex",
      flexDirection: "column",
      gap: "30px",
    },
    ratingContainer: {
      borderRadius: "20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    ratingCardBody: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "48px",
    },
    reviewCard: {
      borderRadius: "20px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    reviewCardBody: {
      padding: "16px",
    },
  };
  const formattedPrice = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
}).format(roomDetails?.price || 0);
 const comments = roomDetails?.comments?.[0]; // Get the first comment object
  const reviews = comments?.reviews || []; // Get reviews from the first comment or set to an empty array if not available
  const starRatings = comments?.starRatings || []; // Get starRatings
  const totalReviews = comments?.total || 0;
  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        <Col md={8}>
          <h2 className="fw-bold">{roomDetails?.name || "Loading..."}</h2>
          <div style={styles.titlecontainer}>
            <Badge bg="warning-subtle" text="dark">
              ⭐ {comments.rating || 0} ({comments?.total } đánh giá)
            </Badge>
            <Badge className="ms-2" bg="info-subtle" text="dark">
              📍 {roomDetails?.location || "Loading..."} | <Link>Xem bản đồ và lịch trình</Link>
            </Badge>
          </div>
        </Col>
        <Col md={4} className="text-end">
          <h3 className="fw-bold text-success">{formattedPrice}/Ngày</h3>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Carousel>
            {roomDetails?.images?.length > 0 ? roomDetails?.images?.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 rounded"
                  src={image}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            )) : (
              <Carousel.Item>
                <img
                  className="d-block w-100 rounded"
                  src={roomDetails.images[0]}
                  alt="Slide default"
                />
              </Carousel.Item>
            )}
          </Carousel>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={8}>
          <h3 className="fw-bold">Đặc điểm nổi bật</h3>
          <ul>
            {roomDetails?.services?.map((item, index) => (
              <li key={index}>✅ {item}</li>
            ))}
          </ul>
          {roomDetails?.details?.map((text, index) => (
            <p key={index}>✔ {text}</p>
          ))}
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={8}>
          <h3 className="fw-bold">Giới thiệu</h3>
          <p>{roomDetails?.description || "Không có thông tin mô tả"}</p>
        </Col>
      </Row>

      {/* Đánh giá */}
      <Row className="mt-4" style={styles.feedback}>
        <Col>
          <div style={styles.titleFeedback}>
            <h3 className="fw-bold">Đánh giá ({comments?.total || 0})</h3>
          </div>

          <Card className="mt-3 p-3" style={styles.ratingContainer}>
            <Card.Body style={styles.ratingCardBody}>
              {/* Hiển thị điểm trung bình với biểu tượng sao */}
              <div className="d-flex flex-column align-items-center">
                <h2 className="fw-bold text-warning">
                  {comments?.rating?.toFixed(2) || 0}
                </h2>
                <div>
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={i < Math.round(comments?.rating) ? "text-warning" : "text-secondary"}
                      style={{ fontSize: "1.5rem" }}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-muted">
                  ({comments?.rating?.toFixed(2) || 0} đánh giá)
                </p>
              </div>

              {/* Hiển thị chi tiết số lượng đánh giá từng sao */}
              {comments.length > 0 && (
        <div>
          {comments.starRatings.map((count, i) => (
                                    <div key={i} className="d-flex align-items-center">
                                        <span className="text-primary">{i + 1} sao</span>
                                        <ProgressBar
                                            now={(count / totalReviews) * 100}
                                            className="flex-grow-1 mx-2"
                                            variant={count > 0 ? "warning" : "light"}
                                            style={{ height: "8px", borderRadius: "10px" }}
                                        />
                                        <span className="text-muted">{count} đánh giá</span>
                                    </div>
                                ))}
        </div>
      )}
            </Card.Body>
          </Card>

          {reviews?.map((review, index) => (
            <Card className="mt-3" key={index} style={styles.reviewCard}>
              <Card.Body style={styles.reviewCardBody}>
                <h5>{review?.name || "Anonymous"}</h5>
                {[...Array(review?.rating || 0)].map((_, i) => (
                  <span key={i} className="text-warning">⭐</span>
                ))}
                <p>{review?.comment || "No comment"}</p>
                <small className="text-muted">{review?.date || "Unknown date"}</small>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>

      <div style={{ maxWidth: "700px", margin: 'auto', padding: '20px' }}>
        <Form
          form={form}
          name="feedback-form"
          onFinish={onFinish}
          layout="vertical"
        > 
         <div className ="form-info" style={{display:"flex", textAlign:"center", justifyContent:"space-evenly"}}>
          <Row gutter={16} style={{ paddingRight: "10px" }}>
            <Col lg={12} md={12} xs={24} style={{ paddingRight: "5px" }}>
              <Form.Item
                label="Chất lượng"
                name="rating"
                rules={[{ required: true, message: 'Vui lòng đánh giá chất lượng!' }]}
              >
                <Rate />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} xs={24}>
              <Form.Item
                label="Họ và tên"
                name="name"
                rules={[{ required: true, message: 'Vui lòng nhập họ và tên của bạn!' }]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col lg={12} md={12} xs={24}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại của bạn!' }]}
              >
                <Input placeholder="Nhập số điện thoại" />
              </Form.Item>
            </Col>

            <Col lg={12} md={12} xs={24}>
              <Form.Item
                label="Địa chỉ email"
                name="email"
                rules={[{ required: true, message: 'Vui lòng nhập email của bạn!' }]}
              >
                <Input placeholder="Nhập email" />
              </Form.Item>
            </Col>
          </Row>
          </div>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Đánh giá của bạn"
                name="comment"
                rules={[{ required: true, message: 'Vui lòng nhập ý kiến của bạn!' }]}
              >
                <TextArea rows={4} placeholder="Nhập yêu cầu của bạn" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" htmlType="submit">
                Gửi
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Container>
  );
};

export default RoomDetail;

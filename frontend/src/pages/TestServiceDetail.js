import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Badge, Card, Carousel, Col, Container, ProgressBar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import images from "../assets/images/pages.jpg";

const serviceData = {
    name: "Du thuyền Indochine",
    rating: 5.0,
    reviews: 4,
    location: "Số 22, Bến 2, Cảng Tuần Châu, Hạ Long, Quảng Ninh, Việt Nam",
    price: "4,125,000 đ/khách",
    images: [
        "https://source.unsplash.com/800x400/?halongbay",
        "https://source.unsplash.com/800x400/?cruise",
        "https://source.unsplash.com/800x400/?restaurant",
        "https://source.unsplash.com/800x400/?ship",
    ],
    highlights: [
        "Bao gồm tất cả các bữa ăn",
        "Giáp biển",
        "Quầy bar",
        "Lễ tân 24 giờ",
        "Nhà hàng",
    ],
    details: [
        "Là một trong những du thuyền 5 sao mới và sang trọng nhất cho khách tham quan Vịnh Lan Hạ.",
        "Du thuyền Indochine được trang bị hai nhà hàng, quầy bar, sundeck rộng rãi và cabin sang trọng.",
        "Tất cả các cabins được thiết kế và phù hợp với tiêu chuẩn quốc tế, làm nổi bật trang trí bằng gỗ, với cửa sổ lớn.",
        "Quầy bar trên du thuyền cung cấp các loại rượu khai vị, rượu mạnh, cocktail, bia và các loại rượu vang hảo hạng được tuyển chọn từ khắp nơi trên thế giới."
    ],
    shipInfo: {
        launchYear: 2019,
        cabins: 43,
        hull: "Kim loại",
        itinerary: "Vịnh Lan Hạ - Làng chài Việt Hải - Hang Sáng Tối",
        operator: "Tập đoàn du lịch Hướng Hải",
    },
    reviewsData: {
        averageRating: 5.0,
        totalReviews: 4,
        starRatings: [0, 0, 0, 0, 4],
        reviews: [
            {
                name: "Nguyen Truc Quynh",
                date: "09/05/2024",
                rating: 5,
                comment: "Dịch vụ tốt, đồ ăn ngon. Mình rất hài lòng, sẽ còn quay lại trải nghiệm các du thuyền khác nữa của Mixi Vivu."
            }
        ]
    }
};

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
        gap: "24px",
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
    }
}

const TestServiceDetail = () => {
    const [review, setReview] = useState({ name: "", email: "", phone: "", rating: 0, comment: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };


    return (
        <Container className="mt-4">
            <Row className="align-items-center">
                <Col md={8}>
                    <h2 className="fw-bold">{serviceData.name}</h2>
                    <div style={styles.titlecontainer}>
                        <Badge bg="warning-subtle" text="dark">
                            ⭐ {serviceData.rating} ({serviceData.reviews} đánh giá)
                        </Badge>
                        <Badge className="ms-2" bg="info-subtle" text="dark">
                            📍 {serviceData.location} | <Link>Xem bản đồ và lịch trình</Link>
                        </Badge>
                    </div>
                    <img
                        src={images}
                        alt="Khám phá dịch vụ khách sạn"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Col>
                <Col md={4} className="text-end">
                    <h3 className="fw-bold text-success">{serviceData.price}</h3>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    <Carousel>
                        {serviceData.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100 rounded"
                                    src={image}
                                    alt={`Slide ${index + 1}`}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={8}>
                    <h3 className="fw-bold">Đặc điểm nổi bật</h3>
                    <img
                        src={images}
                        alt="Khám phá dịch vụ khách sạn"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <ul>
                        {serviceData.highlights.map((item, index) => (
                            <li key={index}>✅ {item}</li>
                        ))}
                    </ul>
                    {serviceData.details.map((text, index) => (
                        <p key={index}>✔ {text}</p>
                    ))}
                </Col>
            </Row>

            {/* Giới thiệu */}
            <Row className="mt-4">
                <Col md={8}>
                    <h3 className="fw-bold">Giới thiệu</h3>
                    <img
                        src={images}
                        alt="Khám phá dịch vụ khách sạn"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
                </Col>
            </Row>

            {/* Đánh giá */}
            <Row className="mt-4" style={styles.feedback}>
                <Col>
                    <div style={styles.titleFeedback}>
                        <h3 className="fw-bold">Đánh giá ({serviceData.reviewsData.totalReviews})</h3>
                    </div>
                    <img
                        src={images}
                        alt="Khám phá dịch vụ khách sạn"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <Card className="mt-3 p-3" style={styles.ratingContainer}>
                        <Card.Body style={styles.ratingCardBody}>
                            {/* Hiển thị điểm trung bình với biểu tượng sao */}
                            <div className="d-flex flex-column align-items-center">
                                <h2 className="fw-bold text-warning">{serviceData.reviewsData.averageRating.toFixed(2)}</h2>
                                <div>
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={i < Math.round(serviceData.reviewsData.averageRating) ? "text-warning" : "text-secondary"} style={{ fontSize: "1.5rem" }}>
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                                <p className="text-muted">({serviceData.reviewsData.totalReviews} đánh giá)</p>
                            </div>

                            {/* Hiển thị chi tiết số lượng đánh giá từng sao */}
                            <div className="w-100">
                                {serviceData.reviewsData.starRatings.map((count, i) => (
                                    <div key={i} className="d-flex align-items-center">
                                        <span className="text-primary">{i + 1} sao</span>
                                        <ProgressBar
                                            now={(count / serviceData.reviewsData.totalReviews) * 100}
                                            className="flex-grow-1 mx-2"
                                            variant={count > 0 ? "warning" : "light"}
                                            style={{ height: "8px", borderRadius: "10px" }}
                                        />
                                        <span className="text-muted">{count} đánh giá</span>
                                    </div>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                    {serviceData.reviewsData.reviews.map((review, index) => (
                        <Card className="mt-3" key={index} style={styles.reviewCard}>
                            <Card.Body style={styles.reviewCardBody}>
                                <h5>{review.name}</h5>
                                {[...Array(review.rating)].map((_, i) => (
                                    <span key={i} className="text-warning">⭐</span>
                                ))}
                                <p>{review.comment}</p>
                                <small className="text-muted">{review.date}</small>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default TestServiceDetail;
import React from "react";
import { useState, useEffect } from "react";
import { Container, Row, Col, Carousel, Badge, Card, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imagess from "../assets/images/pages.jpg";
import API from "../utils/axiosInstance";
import { useParams } from "react-router-dom";
import { CheckOutlined } from "@ant-design/icons";
import BreadcrumbNav from "../components/BreadcrumbNav";

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
        paddingBottom: "48px",
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
    buttonFeedbackNav: {
        backgroundColor: "#77dada",
        border: "none",
        borderRadius: "50px",
        padding: "10px 20px",
    },
    buttonFeedbackContainer: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "24px",
    },
    buttonFeedback: {
        marginBottom: "24px",
        padding: "15px 30px",
        border: "none",
        borderRadius: "50px",
        backgroundColor: "#77dada",
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

const ServiceDetail = () => {
    const { serviceId } = useParams();
    const [serviceData, setServiceData] = useState();

    useEffect(() => {
        if (!serviceId) {
            console.error("ID không hợp lệ:", serviceId);
            return;
        }

        const fetchServiceData = async () => {
            try {
                const response = await API.get(`/service/${serviceId}`);
                setServiceData(response.data);
            } catch (error) {
                console.error("Error fetching service data:", error);
            }
        };

        fetchServiceData();
    }, [serviceId]);

    return (
        <Container className="mt-4">
            {!serviceData ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Row className="align-items-center">
                        <Col md={8}>
                            <h2 className="fw-bold">{serviceData.title}</h2>
                            <div style={styles.titlecontainer}>
                                <Badge bg="warning-subtle" text="dark">
                                    ⭐ {serviceData.rating} ({serviceData?.reviews.length} đánh giá)
                                </Badge>
                                <Badge className="ms-2" bg="info-subtle" text="dark">
                                    🥇 {serviceData.category}
                                </Badge>
                            </div>
                            <img
                                src={imagess}
                                alt="Khám phá dịch vụ khách sạn"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </Col>
                        <Col md={4} className="text-end">
                            <h3 className="fw-bold text-success">
                                {serviceData.price.toLocaleString("vi-VN")} đ
                            </h3>
                        </Col>
                    </Row>
                </>
            )}
            <Row className="mt-3">
                <Col>
                    {serviceData?.images?.length > 0 && (
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
                    )}
                </Col>
            </Row>
            <Row className="mt-4">
                <Col md={8}>
                    <h3 className="fw-bold">Đặc điểm nổi bật</h3>
                    <img
                        src={imagess}
                        alt="Khám phá dịch vụ khách sạn"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <div className="d-flex mt-2">
                        <CheckOutlined style={{ color: "#77dada", marginRight: "8px" }} />
                        {serviceData?.summary}
                    </div>
                </Col>
            </Row>

            {/* Giới thiệu */}
            <Row className="mt-4">
                <Col md={8}>
                    <h3 className="fw-bold">Giới thiệu</h3>
                    <img
                        src={imagess}
                        alt="Khám phá dịch vụ khách sạn"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                    <div>{serviceData?.description}</div>
                </Col>
            </Row>

            
        </Container>
    );
};

export default ServiceDetail;
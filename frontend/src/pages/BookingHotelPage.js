import { ArrowRightOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import images from "../assets/images/pages.jpg";
import background from "../assets/images/section-background.jpg";
import Banner from "../components/Banner";
import CardComponent from "../components/CardComponent";

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
  },
};

function BookingHotelPage() {
  return (
    <Container fluid className="p-0 m-2">
      <Row className="p-2 m-2">
        <Banner />
        <Row className="mt-5">
          <Col lg={12} className="mt-5">
            <Row className="mb-5">
              <Col lg={6}>
                <h4 className="fw-bold pl-3" style={styles.heading}>
                  Khám phá và trải nghiệm <br />
                  tất cả dịch vụ tuyệt vời nhất <br />
                  từ khách sạn đẳng cấp nhất <br />
                  Việt Nam Go Lodge.
                </h4>
                <img
                  src={images}
                  alt="Khám phá dịch vụ khách sạn"
                  style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }}
                />
              </Col>
              <Col lg={6} style={styles.paragraph}>
                <p>
                  Không gian nghỉ dưỡng sang trọng, tiện nghi và hiện đại cùng dịch vụ chuyên nghiệp,
                  Golodge tự hào mang đến những trải nghiệm hoàn hảo cho kỳ nghỉ của bạn, giúp bạn tận
                  hưởng từng khoảnh khắc một cách đáng nhớ và trọn vẹn nhất!
                </p>
              </Col>
            </Row>
            <CardComponent />
            <div style={styles.sectionBackground}>
              <Row className="p-0 m-0">
                <Col lg={6} className="mt-5 md-5">
                  <h4 className="fw-bold pr-3" style={styles.heading}>
                    Đánh giá từ những<br />
                    người đã trải nghiệm
                  </h4>
                  <img
                    src={images}
                    alt="Đánh giá khách hàng"
                    style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }}
                  />
                </Col>
                <Col lg={6} style={styles.paragraph} className="mt-5">
                  <p>Khách hàng chia sẻ về những trải nghiệm tuyệt vời tại Go Lodge</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Row className="p-0 m-0" style={styles.backGround}>
            <Col lg={6} className="mt-5">
              <h4 className="fw-bold pr-3" style={styles.heading}>
                Khám phá Sự đặc sắc<br />
                và Cập nhật tin tức mới nhất
              </h4>
              <img
                src={images}
                alt="Khám phá tin tức"
                style={{ maxWidth: "100%", height: "auto", marginLeft: "20px" }}
              />
            </Col>
            <Col lg={6} style={styles.paragraph} className="mt-5">
              <p>Những dịch vụ hấp dẫn cùng nhiều thông tin cần thiết cho chuyến nghỉ dưỡng của bạn</p>
            </Col>
            <div style={styles.buttonContainer}>
              <Button type="default" shape="round" size="middle" icon={<ArrowRightOutlined />} style={styles.button}
              onClick={() => window.location.href = '/'}>
                Xem tất cả
              </Button>
            </div>
          </Row>
        </Row>
      </Row>
    </Container>
  );
}

export default BookingHotelPage;

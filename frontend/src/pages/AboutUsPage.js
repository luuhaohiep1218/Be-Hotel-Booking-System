import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const styles = {
  bannerImage: {
    width: "100vw",
    height: "auto",
    display: "block",
  },
  desContainer: {
    textAlign: "center",
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  desTitle: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#800000",
    textTransform: "uppercase",
    borderBottom: "3px solid #800000",
    display: "inline-block",
    paddingBottom: "5px",
  },
  desImage: {
    width: "100%",
    borderRadius: "10px",
  },
  desTextContainer: {
    textAlign: "justify",
    lineHeight: "1.8",
  },
  desParagraph: {
    marginBottom: "1rem",
  },
};

const AboutUs = () => {
  return (
    <div>
      <img
        src="https://a25hotel.com/files/images/sinh%20nh%E1%BA%ADt-100.jpg"
        alt="About Us Banner"
        style={styles.bannerImage}
      />
      <Container style={styles.desContainer}>
        <h2 style={styles.desTitle}>Về Chúng Tôi</h2>
        <Row className="mt-4">
          <Col md={6}>
            <img
              src="https://a25hotel.com/files/images/sinh%20nh%E1%BA%ADt-100.jpg"
              alt="About Us"
              style={styles.desImage}
            />
          </Col>
          <Col md={6} style={styles.desTextContainer}>
            <p style={styles.desParagraph}>
              Thương hiệu khách sạn A25 được thành lập từ năm 2003, qua hơn hai
              thập kỷ phát triển, A25 đã tạo dựng và khẳng định được dấu ấn của
              mình trong lĩnh vực lưu trú, nghỉ dưỡng, với hệ thống hơn 60 khách
              sạn trải dài không chỉ ở Việt Nam, mà còn mở rộng trên thế giới.
            </p>
            <p style={styles.desParagraph}>
              Một đặc điểm chung dễ nhận thấy và tạo ấn tượng sâu sắc nhất với
              những vị khách đã từng đến với A25 chính là vị trí tiện lợi, toàn
              bộ hệ thống khách sạn của A25 đều được đặt tại các quận trung tâm,
              tâm điểm giao thương về văn hóa và du lịch ở các thành phố lớn
              như: Hà Nội, TP. Hồ Chí Minh và Đà Nẵng, Hạ Long. Điều này giúp du
              khách dễ dàng khám phá và đắm chìm trong không gian đậm đà văn hóa
              truyền thống của Việt Nam hay hòa mình vào nhịp sống hiện đại và
              sôi động của các thành phố lớn.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p style={styles.desParagraph}>
              Với hơn 2000 phòng nghỉ, được trang bị đầy đủ tiện nghi hiện đại,
              cùng hệ thống nhà hàng Bistro sang trọng và các phòng hợp hội nghị
              rộng lớn, A25 mang đến nhiều lựa chọn vượt trội trong cùng phân
              khúc, đáp ứng mọi nhu cầu về dịch vụ lưu trú, nghỉ ngơi hoặc tổ
              chức tiệc, hội thảo cho du khách trong và ngoài nước.
            </p>
            <p style={styles.desParagraph}>
              Không chỉ cung cấp dịch vụ lưu trú, khách sạn A25 còn hỗ trợ đặt
              vé máy bay, vé tàu hỏa, thuê xe ô tô, gia hạn và làm mới visa, hộ
              chiếu, cũng như tổ chức các tour du lịch trọn gói trong và ngoài
              nước để đảm bảo chuyến tham quan của du khách thoải mái và tiện
              lợi nhất.
            </p>
            <p style={styles.desParagraph}>
              Nhưng điểm mạnh lớn nhất của chúng tôi, và được hàng ngàn lượt
              khách đánh giá cao, chính là đội ngũ nhân viên. Thân thiện, tận
              tâm và tử tế, đó luôn là phương châm phục vụ của đội ngũ nhân viên
              dày dặn kinh nghiệm tại hệ thống khách sạn A25.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;
=======
import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const styles = {
  bannerImage: {
    width: "100vw",
    height: "auto",
    display: "block",
  },
  desContainer: {
    textAlign: "center",
    marginTop: "5rem",
    marginBottom: "5rem",
  },
  desTitle: {
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#800000",
    textTransform: "uppercase",
    borderBottom: "3px solid #800000",
    display: "inline-block",
    paddingBottom: "5px",
  },
  desImage: {
    width: "100%",
    borderRadius: "10px",
  },
  desTextContainer: {
    textAlign: "justify",
    lineHeight: "1.8",
  },
  desParagraph: {
    marginBottom: "1rem",
  },
};

const AboutUs = () => {
  return (
    <div>
      <img
        src="https://a25hotel.com/files/images/sinh%20nh%E1%BA%ADt-100.jpg"
        alt="About Us Banner"
        style={styles.bannerImage}
      />
      <Container style={styles.desContainer}>
        <h2 style={styles.desTitle}>Về Chúng Tôi</h2>
        <Row className="mt-4">
          <Col md={6}>
            <img
              src="https://a25hotel.com/files/images/sinh%20nh%E1%BA%ADt-100.jpg"
              alt="About Us"
              style={styles.desImage}
            />
          </Col>
          <Col md={6} style={styles.desTextContainer}>
            <p style={styles.desParagraph}>
              Thương hiệu khách sạn A25 được thành lập từ năm 2003, qua hơn hai
              thập kỷ phát triển, A25 đã tạo dựng và khẳng định được dấu ấn của
              mình trong lĩnh vực lưu trú, nghỉ dưỡng, với hệ thống hơn 60 khách
              sạn trải dài không chỉ ở Việt Nam, mà còn mở rộng trên thế giới.
            </p>
            <p style={styles.desParagraph}>
              Một đặc điểm chung dễ nhận thấy và tạo ấn tượng sâu sắc nhất với
              những vị khách đã từng đến với A25 chính là vị trí tiện lợi, toàn
              bộ hệ thống khách sạn của A25 đều được đặt tại các quận trung tâm,
              tâm điểm giao thương về văn hóa và du lịch ở các thành phố lớn
              như: Hà Nội, TP. Hồ Chí Minh và Đà Nẵng, Hạ Long. Điều này giúp du
              khách dễ dàng khám phá và đắm chìm trong không gian đậm đà văn hóa
              truyền thống của Việt Nam hay hòa mình vào nhịp sống hiện đại và
              sôi động của các thành phố lớn.
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <p style={styles.desParagraph}>
              Với hơn 2000 phòng nghỉ, được trang bị đầy đủ tiện nghi hiện đại,
              cùng hệ thống nhà hàng Bistro sang trọng và các phòng hợp hội nghị
              rộng lớn, A25 mang đến nhiều lựa chọn vượt trội trong cùng phân
              khúc, đáp ứng mọi nhu cầu về dịch vụ lưu trú, nghỉ ngơi hoặc tổ
              chức tiệc, hội thảo cho du khách trong và ngoài nước.
            </p>
            <p style={styles.desParagraph}>
              Không chỉ cung cấp dịch vụ lưu trú, khách sạn A25 còn hỗ trợ đặt
              vé máy bay, vé tàu hỏa, thuê xe ô tô, gia hạn và làm mới visa, hộ
              chiếu, cũng như tổ chức các tour du lịch trọn gói trong và ngoài
              nước để đảm bảo chuyến tham quan của du khách thoải mái và tiện
              lợi nhất.
            </p>
            <p style={styles.desParagraph}>
              Nhưng điểm mạnh lớn nhất của chúng tôi, và được hàng ngàn lượt
              khách đánh giá cao, chính là đội ngũ nhân viên. Thân thiện, tận
              tâm và tử tế, đó luôn là phương châm phục vụ của đội ngũ nhân viên
              dày dặn kinh nghiệm tại hệ thống khách sạn A25.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutUs;

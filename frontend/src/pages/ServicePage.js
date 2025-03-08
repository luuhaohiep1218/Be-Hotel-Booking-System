import { React, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import images from "../assets/images/pages.jpg";
import { Slider } from "antd";

const services = [
  {
    id: 1,
    image: "https://storage.googleapis.com/a1aa/image/spa.jpg",
    rating: "4.9 (15 đánh giá)",
    location: "Hà Nội",
    title: "Dịch vụ Spa & Massage cao cấp",
    details: "Liệu trình thư giãn toàn thân - 90 phút",
    price: "750,000",
  },
  {
    id: 2,
    image: "https://storage.googleapis.com/a1aa/image/hotel.jpg",
    rating: "5.0 (10 đánh giá)",
    location: "Đà Nẵng",
    title: "Dịch vụ lưu trú khách sạn 5 sao",
    details: "Phòng Deluxe - View biển - Ăn sáng miễn phí",
    price: "2,500,000",
  },
  {
    id: 3,
    image: "https://storage.googleapis.com/a1aa/image/car-rental.jpg",
    rating: "4.8 (7 đánh giá)",
    location: "TP. Hồ Chí Minh",
    title: "Dịch vụ cho thuê xe sang trọng",
    details: "Xe Mercedes S-Class - Tài xế riêng",
    price: "3,200,000",
  },
  {
    id: 4,
    image: "https://storage.googleapis.com/a1aa/image/event.jpg",
    rating: "5.0 (5 đánh giá)",
    location: "Hà Nội",
    title: "Dịch vụ tổ chức sự kiện chuyên nghiệp",
    details: "Gói tiệc cưới, hội nghị, sự kiện doanh nghiệp",
    price: "15,000,000",
  },
  {
    id: 5,
    image: "https://storage.googleapis.com/a1aa/image/fitness.jpg",
    rating: "4.9 (12 đánh giá)",
    location: "Đà Nẵng",
    title: "Gói tập Gym & Yoga cao cấp",
    details: "Thẻ thành viên 1 tháng - Hướng dẫn viên riêng",
    price: "1,200,000",
  },
  {
    id: 6,
    image: "https://storage.googleapis.com/a1aa/image/tour.jpg",
    rating: "5.0 (6 đánh giá)",
    location: "Sa Pa",
    title: "Dịch vụ tour du lịch trải nghiệm",
    details: "Chuyến đi 2 ngày 1 đêm - Khám phá thiên nhiên",
    price: "2,750,000",
  },
];

const styles = {
  card: {
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    border: "none",
    width: "100%",
    height: "100%",
    padding: "15px",
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
    textAlign: "left",
    padding: "50px 0",
  },
  titleheading: {
    fontSize: "32px",
    fontWeight: "bold",
  },
  titletext: {
    fontSize: "14px",
    color: "black",
    maxWidth: "450px",
    lineHeight: "1",
    backgroundColor: "white",
    borderRadius: "30px",
    border: "1px solid #ccc",
    padding: "16px 30px",
    boxShadow: "1px 1px 1px rgba(0, 0, 0, 0.1)",
    marginTop: "20px",
  },
  underline: {
    width: "50px",
    height: "3px",
    background: "#63c5da",
    marginTop: "5px",
  },
  filterSection: {
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  filterHeaderGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    borderBottom: "1px solid #ccc",
  },
  buttonHeaderFilter: {
    border: "none",
    background: "transparent",
  },
  filterGroup: {
    marginBottom: "20px",
  },
  filterLabel: {
    fontWeight: "bold",
    marginBottom: "10px",
  },
  resultSection: {
    paddingLeft: "20px",
  },
};

const ServicePage = () => {
  const [filters, setFilters] = useState({
    rating: [],
    starRating: [],
    amenities: [],
    priceRange: [0, 20000000],
  });
  const [selectedOption, setSelectedOption] = useState("Không sắp xếp");

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
  };

  const filteredServices = services.filter(
    (service) => {
      const price = parseInt(service.price.replace(/,/g, ""));
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    }
  );

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: prevFilters[type].includes(value)
        ? prevFilters[type].filter((item) => item !== value)
        : [...prevFilters[type], value],
    }));
  };

  const resetFilters = () => {
    setFilters({
      rating: [],
      starRating: [],
      amenities: [],
      priceRange: [0, 20000000], // Nếu có lọc giá, đặt giá trị mặc định
    });

    // Kiểm tra xem có checkbox nào không trước khi đặt lại
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 0) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };


  return (
    <Container className="py-5">
      <div style={styles.titlecontainer}>
        <div>
          <h1 style={styles.titleheading}>Danh sách dịch vụ</h1>
          <h1 style={styles.titleheading}>của chúng tôi</h1>
          <img
            src={images}
            alt="Khám phá dịch vụ khách sạn"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle variant="light" id="dropdown-basic" style={styles.titletext}>
            {selectedOption}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item eventKey="Không sắp xếp">
              Không sắp xếp
            </Dropdown.Item>
            <Dropdown.Item eventKey="Giá thấp đến cao">
              Giá thấp đến cao
            </Dropdown.Item>
            <Dropdown.Item eventKey="Giá cao đến thấp">
              Giá cao đến thấp
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <Row>
        <Col md={3} style={styles.filterSection}>
          <div style={styles.filterHeaderGroup}>
            <div style={styles.filterLabel}>Lọc kết quả</div>
            <button style={styles.buttonHeaderFilter} onClick={resetFilters}>Đặt lại</button>
          </div>
          <div style={styles.filterGroup}>
            <Form.Label style={styles.filterLabel}>Khoảng giá: {filters.priceRange[0].toLocaleString()}đ - {filters.priceRange[1].toLocaleString()}đ</Form.Label>
            <Slider
              range
              min={0}
              max={20000000}
              step={50000}
              value={filters.priceRange}
              onChange={(value) => setFilters((prev) => ({ ...prev, priceRange: value }))}
            />
          </div>
          <div style={styles.filterGroup}>
            <Form.Label style={styles.filterLabel}>Xếp hạng sao</Form.Label>
            <Form.Check
              type="checkbox"
              label="3 sao"
              onChange={() => handleFilterChange('starRating', '3')}
            />
            <Form.Check
              type="checkbox"
              label="4 sao"
              onChange={() => handleFilterChange('starRating', '4')}
            />
            <Form.Check
              type="checkbox"
              label="5 sao"
              onChange={() => handleFilterChange('starRating', '5')}
            />
          </div>
          <div style={styles.filterGroup}>
            <Form.Label style={styles.filterLabel}>Tiện ích</Form.Label>
            <Form.Check
              type="checkbox"
              label="Phòng gia đình"
              onChange={() => handleFilterChange('amenities', 'familyRoom')}
            />
            <Form.Check
              type="checkbox"
              label="Có bể sục"
              onChange={() => handleFilterChange('amenities', 'jacuzzi')}
            />
            <Form.Check
              type="checkbox"
              label="Bao gồm tất cả các bữa ăn"
              onChange={() => handleFilterChange('amenities', 'allMeals')}
            />
            <Form.Check
              type="checkbox"
              label="Giáp biển"
              onChange={() => handleFilterChange('amenities', 'seaView')}
            />
            <Form.Check
              type="checkbox"
              label="Quầy bar"
              onChange={() => handleFilterChange('amenities', 'bar')}
            />
            <Form.Check
              type="checkbox"
              label="Lễ tân 24 giờ"
              onChange={() => handleFilterChange('amenities', '24hReception')}
            />
            <Form.Check
              type="checkbox"
              label="Khu vực bãi tắm riêng"
              onChange={() => handleFilterChange('amenities', 'privateBeach')}
            />
            <Form.Check
              type="checkbox"
              label="Nhà hàng"
              onChange={() => handleFilterChange('amenities', 'restaurant')}
            />
            <Form.Check
              type="checkbox"
              label="Trung tâm thể dục"
              onChange={() => handleFilterChange('amenities', 'gym')}
            />
            <Form.Check
              type="checkbox"
              label="Phòng có ban công"
              onChange={() => handleFilterChange('amenities', 'balcony')}
            />
            <Form.Check
              type="checkbox"
              label="Wi-Fi miễn phí"
              onChange={() => handleFilterChange('amenities', 'freeWifi')}
            />
            <Form.Check
              type="checkbox"
              label="Miễn phí kayaking"
              onChange={() => handleFilterChange('amenities', 'freeKayaking')}
            />
          </div>
        </Col>
        <Col md={9} style={styles.resultSection}>
          <Row>
            {filteredServices.map((cruise) => (
              <Col key={cruise.id} xs={12} sm={6} lg={4} className="mb-4">
                <Card style={styles.card}>
                  <div style={styles.imageContainer}>
                    <Card.Img style={styles.image} variant="top" src={cruise.image} alt={cruise.title} />
                    <div style={styles.ratingBadge}>
                      {cruise.rating} {cruise.reviews}
                    </div>
                  </div>
                  <Card.Body>
                    <div style={styles.location}>{cruise.location}</div>
                    <Card.Title style={styles.title}>{cruise.title}</Card.Title>
                    <Card.Text style={styles.details}>{cruise.details}</Card.Text>
                    <div style={styles.footer}>
                      <span style={styles.price}>{cruise.price}đ</span>
                      <Button style={styles.button}>Đặt ngay</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ServicePage;

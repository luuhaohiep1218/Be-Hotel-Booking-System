import { React, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Dropdown,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import images from "../assets/images/pages.jpg";
import { Slider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import API from "../utils/axiosInstance";
import ModalBookingService from "../components/ModalComponent/ModalBookingService";
import { Link } from "react-router-dom";

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
    cursor: "pointer",
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
    maxWidth: "100%",
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
    starRating: [],
    amenities: [],
    priceRange: [0, 3000000],
  });

  const [selectedOption, setSelectedOption] = useState("Không sắp xếp");
  const [services, setServices] = useState([]);
  const [sortPrice, setSortPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const [servicesRes, categoriesRes] = await Promise.all([
          API.get(
            `/service?filter[price][gte]=${filters.priceRange[0]
            }&filter[price][lte]=${filters.priceRange[1]}
            &filter[rating][gte]=${filters.starRating
            }&sort=${sortPrice}price&filter[category]=${convertArrayToString(
              filters.amenities
            )}`,
            { signal: controller.signal }
          ),
          API.get(`/service/categories`, { signal: controller.signal }),
        ]);

        if (
          JSON.stringify(servicesRes.data.services) !== JSON.stringify(services)
        ) {
          setServices(servicesRes.data.services);
        }

        setCategories(categoriesRes.data.categories);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Lỗi khi gọi API:", error);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [filters, services, sortPrice]);

  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    if (eventKey === "Giá thấp đến cao") {
      setSortPrice("+");
    } else if (eventKey === "Giá cao đến thấp") {
      setSortPrice("-");
    } else {
      setSortPrice("");
    }
  };

  const parsePrice = (price) => {
    if (typeof price !== "number") {
      price = parseInt(price, 10);
      if (isNaN(price)) return "N/A"; // Tránh lỗi nếu giá trị không hợp lệ
    }
    return price.toLocaleString("en-US");
  };

  const handleCategoryChange = (categoryName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      amenities: prevFilters.amenities.includes(categoryName)
        ? prevFilters.amenities.filter((name) => name !== categoryName) // Bỏ nếu đã có
        : [...prevFilters.amenities, categoryName], // Thêm nếu chưa có
    }));
  };

  const convertArrayToString = (arrCategories) => {
    return arrCategories.join(",");
  };

  const handleStarRatingChange = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      starRating: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      starRating: [],
      amenities: [],
      priceRange: [0, 3000000], // Nếu có lọc giá, đặt giá trị mặc định
    });

    // Kiểm tra xem có checkbox nào không trước khi đặt lại
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkboxes.length > 0) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  };

  const handleSelectedService = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
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
          <Dropdown.Toggle
            variant="light"
            id="dropdown-basic"
            bsPrefix="custom-dropdown-toggle"
            style={styles.titletext}
          >
            {selectedOption} <DownOutlined style={{ marginLeft: "10px" }} />
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
            <button style={styles.buttonHeaderFilter} onClick={resetFilters}>
              Đặt lại
            </button>
          </div>
          <div style={styles.filterGroup}>
            <Form.Label style={styles.filterLabel}>
              Khoảng giá: {filters.priceRange[0].toLocaleString()}đ -{" "}
              {filters.priceRange[1].toLocaleString()}đ
            </Form.Label>
            <Slider
              range
              min={0}
              max={3000000}
              step={100000}
              value={filters.priceRange}
              onChange={(value) =>
                setFilters((prev) => ({ ...prev, priceRange: value }))
              }
            />
          </div>
          <div style={styles.filterGroup}>
            <Form.Label style={styles.filterLabel}>Xếp hạng sao</Form.Label>
            <Form.Check
              type="radio"
              label="3 sao"
              name="starRating"
              checked={filters.starRating === "3"}
              onChange={() => handleStarRatingChange("3")}
            />
            <Form.Check
              type="radio"
              label="4 sao"
              name="starRating"
              checked={filters.starRating === "4"}
              onChange={() => handleStarRatingChange("4")}
            />
            <Form.Check
              type="radio"
              label="5 sao"
              name="starRating"
              checked={filters.starRating === "5"}
              onChange={() => handleStarRatingChange("5")}
            />
          </div>
          <div style={styles.filterGroup}>
            <Form.Label style={styles.filterLabel}>Dịch vụ</Form.Label>
            {categories.map((category) => (
              <Form.Check
                key={category} // Sử dụng tên làm key
                type="checkbox"
                label={category}
                checked={filters.amenities.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
            ))}
          </div>
        </Col>
        <Col md={9} style={styles.resultSection}>
          <Row>
            {services.map((service) => (
              <Col key={service._id} xs={12} sm={6} lg={4} className="mb-4">
                <Link to={`/service/${service._id}`} style={{ textDecoration: "none" }}>
                  <Card style={styles.card}>
                    <div style={styles.imageContainer}>
                      <Card.Img
                        style={styles.image}
                        variant="top"
                        src={service.images[0]}
                        alt={service.title}
                      />
                      <div style={styles.ratingBadge}>{service.rating}</div>
                    </div>
                    <Card.Body>
                      <Card.Title style={styles.title}>
                        {service.title}
                      </Card.Title>
                      <Card.Text style={styles.details}>
                        {service.summary}
                      </Card.Text>
                      <div style={styles.footer}>
                        <span style={styles.price}>
                          {parsePrice(service.price)}đ
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
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <ModalBookingService
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        service={selectedService}
      />
    </Container>
  );
};

export default ServicePage;
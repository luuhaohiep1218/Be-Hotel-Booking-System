import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import API from "../utils/axiosInstance";
import images from "../assets/images/pages.jpg";

const FeaturedNews = () => {
  const [blog, setBlog] = useState();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await API.get("/blog/prominent");
        setBlog(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy internalNews:", error);
      }
    };

    fetchBlog();
  }, []);

  return (
    <Container className="mt-5">
      <h1 className="fw-bold text-dark">{blog?.title}</h1>
      <p
        className="text-secondary mt-3"
        style={{ fontSize: "1.1rem", maxWidth: "700px" }}
      >
        {blog?.summary}
      </p>
      <div>
        <img
          src={images}
          alt="Khám phá dịch vụ khách sạn"
          style={{ maxWidth: "100%", height: "auto", marginBottom: "50px" }}
        />
      </div>
    </Container>
  );
};

export default FeaturedNews;

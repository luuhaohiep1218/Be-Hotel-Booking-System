import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import API from "../utils/axiosInstance";

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
      <div
        className="mt-3"
        style={{ color: "#52c4c6", fontSize: "1.5rem", marginBottom: 100 }}
      >
        ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤
      </div>
    </Container>
  );
};

export default FeaturedNews;

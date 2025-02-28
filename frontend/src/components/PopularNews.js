import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

const FeaturedNews = () => {
  const [internalNews, setInternalNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:3001/internalNews");
        setInternalNews(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy internalNews:", error);
      }
    };

    fetchNews();
  }, []);

  if (internalNews.length === 0) return <p>Không có dữ liệu</p>;

  const featuredPost = internalNews[0]; // Lấy bài viết đầu tiên

  return (
    <Container className="mt-5">
      <h1 className="fw-bold text-dark">
        {featuredPost.title}
      </h1>
      <p className="text-secondary mt-3" style={{ fontSize: "1.1rem", maxWidth: "700px" }}>
        {featuredPost.summary}
      </p>
      <div className="mt-3" style={{ color: "#52c4c6", fontSize: "1.5rem", marginBottom: 100 }}>
        ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤ ⬤
      </div>
    </Container>
  );
};

export default FeaturedNews;

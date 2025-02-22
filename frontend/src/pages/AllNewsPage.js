import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PaginationComponent from "../components/PaginationComponent";
import PopularNews from "../components/PopularNews";

const AllNewsPage = () => {
  const [allNews, setAllNews] = useState([]);
  const [paginatedNews, setPaginatedNews] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [internalResponse, discountsResponse, feedbacksResponse] = await Promise.all([
          axios.get("http://localhost:3001/internalNews"),
          axios.get("http://localhost:3001/discounts"),
          axios.get("http://localhost:3001/feedbacks"),
        ]);
    
        const combinedNews = [
          ...internalResponse.data,
          ...discountsResponse.data,
          ...feedbacksResponse.data
        ].sort((a, b) => new Date(b.date) - new Date(a.date));
    
        setAllNews(combinedNews);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    

    fetchNews();
  }, []);

  
  const totalPages = Math.ceil(allNews.length / itemsPerPage) || 1;

 
  useEffect(() => {
    if (allNews.length === 0) return;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const newPaginatedNews = allNews.slice(startIndex, startIndex + itemsPerPage);

    setPaginatedNews(newPaginatedNews);
  }, [currentPage, allNews]);

  
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Container style={{ padding: "40px" }}>
      <PopularNews  news={paginatedNews}/>
      <BlogHeader />
      <Row>
        <Col style={{ padding: "20px" }}>
          <NewsList news={paginatedNews} />
          <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Col>
      </Row>
    </Container>
  );
};

export default AllNewsPage;

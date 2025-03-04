import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PopularNews from "../components/PopularNews";
import API from "../utils/axiosInstance";

import { Tabs } from "antd";

const AllNewsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [keyCategory, setKeyCategory] = useState("");

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await API.get(
        `/blog?page=${currentPage}&category=${keyCategory}`
      );
      setBlogs(response.data.blogs);
      setTotalBlogs(response.data.totalBlogs);
      setPageSize(response.data.limit);
    };

    fetchBlogs(keyCategory);
  }, [currentPage, keyCategory]);

  console.log(keyCategory);

  const items = [
    {
      key: "1",
      label: "Tất cả",
    },
    {
      key: "internalNews",
      label: "Tin tức nội bộ",
    },
    {
      key: "discounts",
      label: "Khuyến mãi",
    },
  ];

  const onChangeTag = (key) => {
    if (key === "1") {
      setKeyCategory("");
      setCurrentPage(1);
    } else {
      setKeyCategory(key);
      setCurrentPage(1);
    }
  };
  return (
    <Container style={{ padding: "40px" }}>
      <PopularNews />
      {/* <BlogHeader /> */}
      <Tabs defaultActiveKey="1" items={items} onChange={onChangeTag} />
      <Row>
        <Col style={{ padding: "20px" }}>
          <NewsList
            blogs={blogs}
            currentPage={currentPage}
            pageSize={pageSize}
            totalBlogs={totalBlogs}
            onChangePage={onChangePage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default AllNewsPage;

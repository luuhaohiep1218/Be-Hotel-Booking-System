import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NewsList from "../components/NewsList";
import BlogHeader from "../components/HeaderComponent/BlogHeader";
import PopularNews from "../components/PopularNews";
import API from "../utils/axiosInstance";
import styled from "styled-components";

import { Tabs } from "antd";

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav {
    background: #f8f9fa;
    padding: 8px 16px;
    border-radius: 8px;
  }

  .ant-tabs-tab {
    text-decoration: none;
    padding: 6px 14px;
    font-size: 13px;
    font-weight: 500;
    color: #666;
    transition: all 0.3s ease-in-out;
    border-radius: 8px;
    width: 100px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* ✅ Xóa màu xanh mặc định của Ant Design */
  .ant-tabs-tab-active {
    background: white !important;
    border: 1px solid #ddd !important;
    color: rgb(17, 20, 21) !important;
    font-weight: bold;
    padding: 6px 17px;
  }

  /* ✅ Xóa hiệu ứng màu xanh khi click */
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: rgb(17, 20, 21) !important;
  }

  .ant-tabs-tab:hover {
    color: rgb(22, 27, 28);
    background: rgb(255, 255, 255);
  }

  /* ✅ Ẩn thanh gạch xanh dưới tab */
  .ant-tabs-ink-bar {
    display: none !important;
  }
`;

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
      <StyledTabs defaultActiveKey="1" items={items} onChange={onChangeTag} />
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

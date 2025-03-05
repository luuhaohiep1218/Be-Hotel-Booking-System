import React, { useState } from "react";
import { Card, Col, Pagination, Row } from "antd";
import NewsItem from "./NewsItem";
import styled from "styled-components";

// Styled-component cho đường kẻ ngang
const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin: 20px 0;
`;

// Wrapper để đẩy Pagination xuống dưới
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

// Content để card chiếm tối đa không gian và đẩy pagination xuống dưới
const Content = styled.div`
  flex: 1;
`;

// Div bao quanh Pagination để căn phải
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end; /* Canh phải */
  margin-top: 10px;
  padding-bottom: 20px;
`;

const NewsList = ({ news }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  if (!Array.isArray(news)) {
    return <p>Không có dữ liệu tin tức!</p>;
  }

  // Tính toán dữ liệu theo trang
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = news.slice(startIndex, startIndex + pageSize);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <Content>
        <Row gutter={[40, 40]} className="mb-5">
          {currentData.map((item) => (
            <NewsItem key={item.id} item={item} />
          ))}
        </Row>

        {/* Đường kẻ ngang */}
        <Divider />
      </Content>

      {/* Div chứa Pagination được canh phải */}
      <PaginationWrapper>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={news.length}
          onChange={onChange}
        />
      </PaginationWrapper>
    </PageContainer>
  );
};

export default NewsList;

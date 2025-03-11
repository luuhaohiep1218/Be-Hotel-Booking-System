import React, { useEffect, useState } from "react";
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

const NewsList = (props) => {
  const { blogs, currentPage, pageSize, totalBlogs, onChangePage } = props;

  return (
    <PageContainer>
      <Content>
        <Row gutter={[40, 40]} className="mb-5">
          {blogs.map((item) => (
            <NewsItem key={item._id} item={item} />
          ))}
        </Row>
        <Divider />
        <PaginationWrapper>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalBlogs}
            onChange={onChangePage}
          />
        </PaginationWrapper>
      </Content>
    </PageContainer>
  );
};

export default NewsList;

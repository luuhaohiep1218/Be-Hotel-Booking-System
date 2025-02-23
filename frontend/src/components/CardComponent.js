import React, { useState } from "react";
import { Card, Col, Row, Pagination } from "antd";
import styled from "styled-components";

const { Meta } = Card;

// Tạo danh sách dữ liệu giả lập
const mockData = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Card ${i + 1}`,
  description: `Description for card ${i + 1}`,
  image:
    "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=900&h=500&s=1",
}));

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

const CardComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6; // Số card hiển thị mỗi trang

  // Tính toán dữ liệu theo trang
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = mockData.slice(startIndex, startIndex + pageSize);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <Content>
        <Row gutter={[40, 40]} className="mb-5">
          {currentData.map((item) => (
            <Col key={item.id} span={8}>
              <Card hoverable cover={<img alt="example" src={item.image} />}>
                <Meta title={item.title} description={item.description} />
              </Card>
            </Col>
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
          total={mockData.length}
          onChange={onChange}
        />
      </PaginationWrapper>
    </PageContainer>
  );
};

export default CardComponent;

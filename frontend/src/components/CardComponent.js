import { Card, Col, Pagination, Row } from "antd";
import React, { useState } from "react";
import styled from "styled-components";

const { Meta } = Card;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #ddd;
  margin: 20px 0;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
`;

const CardComponent = ({ data, pageSize = 6, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  if (!Array.isArray(data)) {
    console.error("Invalid data: Expected an array.");
    return null;
  }

  // Lấy dữ liệu theo phân trang
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(startIndex, startIndex + pageSize);

  const onChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <PageContainer>
      <Content>
        <Row gutter={[24, 24]}>
          {currentData.map((item) => {
            // Tạo bản sao và cập nhật status nếu quantityLeft = 0
            const updatedItem = { ...item, status: item.quantityLeft === 0 ? "hết phòng" : item.status };

            return (
              <Col key={updatedItem._id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={updatedItem.image ? (
                    <img
                      alt={updatedItem.name}
                      src={updatedItem.image}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  ) : (
                    <div style={{ height: "200px", background: "#f0f0f0" }} />
                  )}
                >
                  <Meta title={updatedItem.name} description={updatedItem.description} />
                  <div style={{ marginTop: "10px", fontWeight: "bold" }}>
                    Giá: {updatedItem.price.toLocaleString("vi-VN")} VND
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <strong>Vị trí:</strong> {updatedItem.location}
                  </div>
                  <div style={{ marginTop: "5px", color: updatedItem.status === "trống" ? "green" : "red" }}>
                    <strong>Trạng thái:</strong> {updatedItem.status}
                  </div>
                  <div style={{ marginTop: "5px" }}>
                    <strong>Số lượng còn lại:</strong> {updatedItem.quantityLeft}
                  </div>
                  {children && children(updatedItem)}
                </Card>
              </Col>
            );
          })}
        </Row>
        <PaginationWrapper>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            onChange={onChange}
          />
        </PaginationWrapper>
      </Content>
    </PageContainer>
  );
};

export default CardComponent;

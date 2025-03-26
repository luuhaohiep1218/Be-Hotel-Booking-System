import { Card, Carousel, Col, Pagination, Row } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";

const { Meta } = Card;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  marginTop: 50px;
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

// ✅ Dùng React.memo để tối ưu hiển thị Card
const MemoizedCard = React.memo(({ item, children }) => {
  const navigate = useNavigate(); // Hook điều hướng

  // Khi nhấn vào card, chuyển hướng đến trang chi tiết
  const handleCardClick = () => {
    const encodedName = encodeURIComponent(item.name); // Mã hóa tên item
    navigate(`/room/${encodedName}`);
    localStorage.setItem("roomId", item._id);
    // Điều hướng đến trang chi tiết của item
  };

  return (
    <Col key={item._id} xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        cover={item.images ? (
          item.images && item.images.length > 0 ? (
    <Carousel autoplay>
      {item.images.map((img, index) => (
        console.log(img),
        <div key={index}>
          <img
            alt={`${item.name}-${index}`}
            src={img}
            style={{ maxHeight: "200px", objectFit: "cover", width: "100%",borderRadius: "10px" }}
          />
        </div>
      ))}
    </Carousel>
          ) : (
            <img
              alt={item.name}
              src={item.images[0]}
              style={{ height: "200px", objectFit: "cover" }}
            />
          )
        ) : (
          <div style={{ height: "200px", background: "#f0f0f0" }}>
           <img src="" alt="test" />
          </div>
        )}
        onClick={handleCardClick} // Gắn sự kiện onClick để chuyển hướng
      >
        <Meta title={item.name} description={item.description} />
        <div style={{ marginTop: "10px", fontWeight: "bold" }}>
          Giá: {item.price.toLocaleString("vi-VN")} VND
        </div>
        <div style={{ marginTop: "5px" }}>
          <strong>Vị trí:</strong> {item.location}
        </div>
        <div style={{ marginTop: "5px", color: item.status === "trống" ? "green" : "red" }}>
          <strong>Trạng thái:</strong> {item.status}
        </div>
        <div style={{ marginTop: "5px" }}>
          <strong>Số lượng còn lại:</strong> {item.quantityLeft}
        </div>
        {children && children(item)}
      </Card>
    </Col>
  );
});

const CardComponent = ({ data, pageSize = 6, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Đảm bảo data luôn là một mảng, tránh lỗi hooks bị gọi conditionally
  const safeData = Array.isArray(data) ? data : [];

  // ✅ Dùng useMemo để tối ưu việc tính toán dữ liệu phân trang
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return safeData.slice(startIndex, startIndex + pageSize);
  }, [safeData, currentPage, pageSize]);

  // ✅ Dùng useCallback để tối ưu hàm xử lý thay đổi trang
  const onChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <PageContainer>
      <Content>
        <Row gutter={[24, 24]}>
          {currentData.map((item) => {
            const updatedItem = { ...item, status: item.quantityLeft === 0 ? "hết phòng" : item.status };
            return (
              <MemoizedCard key={updatedItem._id} item={updatedItem}>
                {children}
              </MemoizedCard>
            );
          })}
        </Row>
        <PaginationWrapper>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={safeData.length}
            onChange={onChange}
          />
        </PaginationWrapper>
      </Content>
    </PageContainer>
  );
};

export default CardComponent;

import React from "react";
import styled from "styled-components";
import { Pagination } from "react-bootstrap";

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
`;

const PaginationInfo = styled.div`
  font-weight: bold;
`;

const CurrentItems = styled.span`
  display: inline-block;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50%;
  border: 2px solid #333;
`;

const CustomPagination = styled(Pagination)`
  display: flex;
  align-items: center;
  border-radius: 25px;
  background: #f8f9fa;
  padding: 5px 10px;

  .page-item {
    margin: 0 3px;

    .page-link {
      color: #333;
      border-radius: 10px;
      padding: 8px 12px;
      border: none;
      transition: background 0.3s ease;

      &:hover {
        background-color: #e9ecef;
      }
    }

    &.active .page-link {
      background-color: #007bff;
      color: white;
      font-weight: bold;
    }

    &.disabled .page-link {
      color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }
    } else {
      pages.push(
        <Pagination.Item key={1} active={currentPage === 1} onClick={() => handlePageChange(1)}>
          1
        </Pagination.Item>
      );

      if (currentPage > 3) {
        pages.push(<Pagination.Ellipsis key="ellipsis1" disabled />);
      }

      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
            {i}
          </Pagination.Item>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(<Pagination.Ellipsis key="ellipsis2" disabled />);
      }

      pages.push(
        <Pagination.Item key={totalPages} active={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }
    return pages;
  };

  return (
    <PaginationContainer>
      <PaginationInfo>
        Đang xem: <CurrentItems>{currentPage}</CurrentItems> của {totalPages}
      </PaginationInfo>
      <CustomPagination>
        <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
          ← Trước
        </Pagination.Prev>
        {renderPageNumbers()}
        <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
          Tiếp →
        </Pagination.Next>
      </CustomPagination>
    </PaginationContainer>
  );
};

export default PaginationComponent;

import React, { useState, useEffect } from "react";
import Sidebar from "../components/MktSidebar";
import styled from "styled-components";
import API from "../utils/axiosInstance";
import { Pagination, Input, Table, Rate, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";

const { Search } = Input;

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #f8f9fa;
`;

const Header = styled.header`
  background: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const Footer = styled.footer`
  background: #343a40;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 14px;
  margin-top: auto;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  transition: margin-left 0.3s;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "70px")};
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 130px);
`;

const SearchBar = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;

  .ant-input-affix-wrapper {
    width: 100%;
    max-width: 400px;
    border-radius: 20px;
    padding: 8px 14px;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:focus-within {
      border-color: #007bff;
      box-shadow: 0 3px 10px rgba(0, 123, 255, 0.3);
    }
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  margin-top: auto;
`;

const FeedbackListPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [pageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await API.get(`/feedback/mktgetfeedback`);
        const feedbackData = response.data.data.map((fb) => ({
          ...fb,
          createdAt: moment(fb.createdAt).format("DD/MM/YYYY hh:mm A"),
        }));
        setFeedbacks(feedbackData);
        setFilteredFeedbacks(feedbackData);
        setTotalFeedbacks(response.data.totalFeedbacks);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      }
    };

    fetchFeedbacks();
  }, [currentPage, pageSize]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredFeedbacks(feedbacks);
    } else {
      const filtered = feedbacks.filter((fb) =>
        fb.comment.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredFeedbacks(filtered);
    }
  }, [searchQuery, feedbacks]);

  const desc = ["terrible", "bad", "normal", "good", "wonderful"];

  const columns = [
    {
      title: "User Name",
      dataIndex: "userId",
      key: "userId",
      render: (user) => user?.full_name || "Unknown",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (
        <Tooltip title={desc[rating - 1]}>
          <Rate disabled value={rating} />
        </Tooltip>
      ),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) =>
        images && images.length > 0
          ? images
              .filter((img) => typeof img === "string" && img) // Lọc bỏ null, undefined và non-string
              .map((img, index) => (
                <img
                  key={index}
                  src={`${img}`}
                  alt={`Feedback-${index}`}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                    marginRight: "8px",
                  }}
                />
              ))
          : "No Image",
    },

    {
      title: "Time Submitted",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <PageContainer>
      <Header>📝 Feedback List</Header>
      <MainContent>
        <Sidebar onToggle={setIsSidebarOpen} />
        <ContentWrapper isSidebarOpen={isSidebarOpen}>
          <h2 style={{ color: "black" }}>Feedbacks</h2>
          <SearchBar>
            <Input
              placeholder="Search feedback..."
              prefix={<SearchOutlined style={{ color: "#888" }} />}
              allowClear
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>

          <Table
            columns={columns}
            dataSource={filteredFeedbacks}
            pagination={false}
            rowKey="_id"
          />

          <PaginationWrapper>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalFeedbacks}
              onChange={(page) => setCurrentPage(page)}
            />
          </PaginationWrapper>
        </ContentWrapper>
      </MainContent>
      <Footer></Footer>
    </PageContainer>
  );
};

export default FeedbackListPage;

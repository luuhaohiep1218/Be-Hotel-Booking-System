import React, { useState, useEffect } from "react";
import Sidebar from "../components/MktSidebar";
import styled from "styled-components";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import API from "../utils/axiosInstance";

const PageContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.header`
  background: #007bff;
  color: white;
  padding: 15px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const Footer = styled.footer`
  background: #343a40;
  color: white;
  padding: 10px;
  text-align: center;
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
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "80px")};
`;

const BlogCard = styled.div`
  background: white;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${(props) => props.color || "#007bff"};

  h4 {
    color: ${(props) => props.color || "#007bff"};
    margin-bottom: 8px;
  }

  p {
    color: #555;
    font-size: 14px;
  }

  small {
    display: block;
    margin-top: 5px;
    color: #777;
  }
`;

const ChartContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

const MarketingDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mostViewedBlog, setMostViewedBlog] = useState(null);
  const [feedbackSummary, setFeedbackSummary] = useState(null);
  const [blogRatingSummary, setBlogRatingSummary] = useState(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [viewedRes, feedbackRes, ratingRes] = await Promise.all([
          API.get("/blog/prominent"), // Fetch most viewed blog
          API.get("/blog/feedback-summary"), // Fetch feedback summary
          API.get("/blog/ratings-summary"), // Fetch blog ratings summary
        ]);

        console.log("Most viewed blog:", viewedRes.data);
        setMostViewedBlog(viewedRes.data);

        console.log("Feedback summary:", feedbackRes.data);
        setFeedbackSummary(feedbackRes.data);

        console.log("Blog ratings summary:", ratingRes.data);
        setBlogRatingSummary(ratingRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBlogData();
  }, []);

  const feedbackChartData = {
    labels: ["⭐ 5", "⭐ 4", "⭐ 3", "⭐ 2", "⭐ 1"],
    datasets: [
      {
        label: "Feedback Count",
        data: feedbackSummary
          ? Object.values(feedbackSummary)
          : [0, 0, 0, 0, 0],
        backgroundColor: [
          "#28a745",
          "#17a2b8",
          "#ffc107",
          "#fd7e14",
          "#dc3545",
        ],
      },
    ],
  };

  const blogRatingChartData = {
    labels: ["⭐ 5", "⭐ 4", "⭐ 3", "⭐ 2", "⭐ 1"],
    datasets: [
      {
        label: "Blog Count by Rating",
        data: blogRatingSummary
          ? Object.values(blogRatingSummary)
          : [0, 0, 0, 0, 0],
        backgroundColor: [
          "#28a745",
          "#17a2b8",
          "#ffc107",
          "#fd7e14",
          "#dc3545",
        ],
      },
    ],
  };

  return (
    <PageContainer>
      <Header>📊 Marketing Dashboard</Header>

      <MainContent>
        <Sidebar onToggle={setIsSidebarOpen} />
        <ContentWrapper isSidebarOpen={isSidebarOpen}>
          <h2 style={{ color: "#007bff" }}>Marketing Statistics</h2>

          {/* Blog có lượt xem cao nhất */}
          <h3>🔥 Most Viewed Blog</h3>
          {mostViewedBlog ? (
            <BlogCard color="#ff5733">
              <h4>{mostViewedBlog.title}</h4>
              <p>{mostViewedBlog.summary}</p>
              <small>
                📍 {mostViewedBlog.location} | 👀 {mostViewedBlog.views} views
              </small>
            </BlogCard>
          ) : (
            <p>Loading...</p>
          )}

          {/* Biểu đồ tổng hợp số lượng đánh giá blog theo rating */}
          <ChartContainer>
            <h3>⭐ Blog Rating Summary</h3>
            <Bar data={blogRatingChartData} />
          </ChartContainer>

          {/* Biểu đồ tổng hợp số lượng đánh giá feedback */}
          <ChartContainer>
            <h3>⭐ Feedback Summary</h3>
            <Bar data={feedbackChartData} />
          </ChartContainer>
        </ContentWrapper>
      </MainContent>

      <Footer></Footer>
    </PageContainer>
  );
};

export default MarketingDashboard;

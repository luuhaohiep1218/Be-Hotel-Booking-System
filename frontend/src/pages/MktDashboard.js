import React, { useState, useEffect } from "react";
import styled from "styled-components";
import API from "../utils/axiosInstance";
import Sidebar from "../components/MktSidebar";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const DashboardContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #eef1f6;
`;

const ContentWrapper = styled.div`
  flex: 1;
  padding: 20px;
  margin-left: ${(props) => (props.isSidebarOpen ? "250px" : "70px")};
  transition: margin-left 0.3s;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  color: #212529;
  margin: 30px 0 15px;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 48%;
  text-align: left;
  margin-bottom: 20px;

  h3 {
    color: #222;
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  p {
    color: #555;
    font-size: 1rem;
  }
  .views,
  .rating {
    font-weight: bold;
    font-size: 1.2rem;
  }
  .views {
    color: #007bff;
  }
  .rating {
    color: #ffb400;
  }
`;

const ChartContainer = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  width: 50%;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MarketingDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [blog, setBlog] = useState(null);
  const [topRatedService, setTopRatedService] = useState(null);
  const [feedbackSummary, setFeedbackSummary] = useState(null);
  const [loadingFeedback, setLoadingFeedback] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, serviceRes, feedbackRes] = await Promise.all([
          API.get("/blog/prominent"),
          API.get("/service/top-rated"),
          API.get("/feedback/mktDashboardFeedback"),
        ]);

        setBlog(blogRes.data);
        setTopRatedService(serviceRes.data);
        setFeedbackSummary(feedbackRes.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingFeedback(false);
      }
    };

    fetchData();
  }, []);

  const feedbackChartData = {
    labels: ["⭐ 5", "⭐ 4", "⭐ 3", "⭐ 2", "⭐ 1"],
    datasets: [
      {
        label: "Feedback Count",
        data: feedbackSummary
          ? [
              feedbackSummary["5"],
              feedbackSummary["4"],
              feedbackSummary["3"],
              feedbackSummary["2"],
              feedbackSummary["1"],
            ]
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <DashboardContainer>
      <Sidebar onToggle={setIsSidebarOpen} />
      <ContentWrapper isSidebarOpen={isSidebarOpen}>
        <h1>📊 Marketing Dashboard</h1>

        <SectionTitle>📄TOP Blog and Service </SectionTitle>
        <CardContainer>
          {blog ? (
            <Card>
              <h3>{blog.title}</h3>
              <p>{blog.description}</p>
              <p className="views">👀 Views: {blog.views}</p>
              <p>📅 Date: {blog.date}</p>
              <p>✍️ Author: {blog.customerName}</p>
            </Card>
          ) : (
            <Card>
              <p>No popular blogs found.</p>
            </Card>
          )}
          {topRatedService ? (
            <Card>
              <h3>{topRatedService.title}</h3>
              <p>{topRatedService.description}</p>
              <p className="rating">⭐ Rating: {topRatedService.rating}</p>
              <p>🛠️ Category: {topRatedService.category}</p>
            </Card>
          ) : (
            <Card>
              <p>No top-rated service found.</p>
            </Card>
          )}
        </CardContainer>

        <SectionTitle>📊 Feedback Summary</SectionTitle>
        <ChartContainer>
          {loadingFeedback ? (
            <p>Loading feedback data...</p>
          ) : (
            <Bar data={feedbackChartData} options={chartOptions} />
          )}
        </ChartContainer>
      </ContentWrapper>
    </DashboardContainer>
  );
};

export default MarketingDashboard;

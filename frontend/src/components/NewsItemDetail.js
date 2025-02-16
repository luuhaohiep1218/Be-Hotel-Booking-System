// src/components/NewsItemDetail.jsx
import React from "react";
import { Col } from "react-bootstrap";

const NewsItemDetail = ({ newsItem }) => {
  
  if (!newsItem) {
    return (
      <Col md={9}>
        <p>Loading news details...</p>
      </Col>
    );
  }

  return (
    <Col >
      <h2 style={{ color: "#22ACC1", marginBottom: "20px" }}>
        {newsItem.title}
      </h2>

      <div
            style={{
              height: "3px",
              width: "8%",
              backgroundColor: "#22ACC1",
              margin: "0 auto",
            }}
          ></div>
          <div
            style={{
              height: "3px",
              width: "25%",
              backgroundColor: "#22ACC1",
              margin: "0 auto",
              marginBottom: 4,
              marginTop: 4,
            }}
          ></div>
          <div
            style={{
              height: "3px",
              width: "8%",
              backgroundColor: "#22ACC1",
              margin: "0 auto",
              marginBottom: 30,
            }}
          ></div>

       <div style={{ marginBottom: "20px", lineHeight: "1.6", fontSize: "0.9rem", color: "#444" }}>
             {newsItem.content ? newsItem.content : newsItem.summary}
       </div>

      
      {/* Kiểm tra mảng ảnh */}
      {newsItem.images && newsItem.images.length > 0 ? (
        <div 
          style={{ 
            marginBottom: "20px", 
            display: "flex", 
            flexWrap: "wrap", 
            gap: "10px" 
          }}
        >
          {newsItem.images.map((imgUrl, index) => (
            <img
              key={index}
              src={imgUrl}
              alt={`${newsItem.title} - ${index + 1}`}
              style={{ width: "calc(50% - 5px)", borderRadius: "5px" }}
            />
          ))}
        </div>
      ) : (
        // Hiển thị ảnh đơn nếu có
        newsItem.image && (
          <div style={{ marginBottom: "20px" }}>
            <img
              src={newsItem.image}
              alt={newsItem.title}
              style={{ maxWidth: "100%", borderRadius: "5px" }}
            />
          </div>
        )
      )}
    </Col>
  );
};

export default NewsItemDetail;

import React from "react";
import { Card } from "react-bootstrap";

const PopularPost = ({ popu }) => {
  return (
    <div>
      <h4 style={{ fontWeight: "bold", color: "#333", marginBottom: "15px" }}>Tin tức phổ biến</h4>
      {popu.slice(0, 1).map((item, index) => (
        <Card key={index} className="mb-3">
          <Card.Img 
            variant="top" 
            src={item.image} 
            alt={item.title} 
            style={{ height: "180px", objectFit: "cover", borderRadius: "8px" }} 
          />
          <Card.Body>
            <Card.Title style={{ fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}>
              {item.title}
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PopularPost;

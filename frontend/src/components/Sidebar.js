import React from "react";
import { ListGroup, Image } from "react-bootstrap";

const Sidebar = ({ news }) => {
  return (
    <>
      <h5 style={{ marginBottom: "15px", fontWeight: "bold", color: "#333" }}>BÀI VIẾT MỚI NHẤT</h5>
      <ListGroup>
        {news.slice(0, 2).map((item, index) => (
          <ListGroup.Item key={index} style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Image 
              src={item.image} 
              alt={item.title} 
              style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px", marginRight: "10px" }} 
            />
            <span style={{ fontSize: "0.95rem", color: "#333", fontWeight: "500" }}>{item.title}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default Sidebar;

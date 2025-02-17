import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const PopularPost = ({ popu }) => {
  return (
    <div>
      {popu.slice(0, 1).map((item, index) => (
        <Card key={index} className="mb-3">
          <Card.Img 
            variant="top" 
            src={item.image} 
            alt={item.title} 
            style={{ height: "500px", objectFit: "cover", borderRadius: "8px" }} 
          />
          <Card.Body>
          <Card.Title style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#333" }}><Link 
              to={`/news/${item.id}`} 
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.title}
            </Link></Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default PopularPost;
